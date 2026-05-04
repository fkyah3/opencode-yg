class_name TerminalCommandManager
## Utility class for working with terminal commands.
##
##Example:
##[codeblock]
##var cmd_manager := TerminalCommandManager.new()
##var echo_cmd: TerminalCommand = cmd_manager.load_command("echo")
##echo_cmd.execute(terminal, args)
##[/codeblock]


## Path to a folder containing all command scripts.
const COMMANDS_DIR: String = "res://Applications/Terminal/commands/"


## Returns a instance of the command that [param call_name] matches given [param command_call_name].[br]
##[br]
## The program will [b]CRASH[/b] if a invalid [param call_name] is given, use [method TerminalCommandManager.cmd_exists] first.
func load_command(command_call_name: String) -> TerminalCommand:
	for cmd_file: String in get_commands_folder_contents():
		var cmd: Resource = load(COMMANDS_DIR + cmd_file).new()
		if cmd is TerminalCommand and cmd.call_name == command_call_name:
			return cmd
	
	#ALERT Crash if loading a invalid command, this should not happen
	assert(false, "Trying to load a invalid command")
	return null


## Returns a list of all valid command [param call_name]'s.
func get_command_call_names() -> Array[String]:
	var names: Array[String] = []
	
	for cmd_file: String in get_commands_folder_contents():
		var cmd: Resource = load(COMMANDS_DIR + cmd_file).new()
		if cmd is TerminalCommand:
			names.append(cmd.call_name)
	
	return names


## Search for a command that [param call_name] matches the given [param command_call_name].
func cmd_exists(command_call_name: String) -> bool:
	return get_command_call_names().has(command_call_name)


## Returns a list with all valid command files founded.[br]
##Example:
##[codeblock]
##print(get_commands_folder_contents())
###prints ["echo_command.gd", "clear_command.gd", ...]
##[/codeblock]
func get_commands_folder_contents() -> PackedStringArray:
	var folder_contents: PackedStringArray = ResourceLoader.list_directory(COMMANDS_DIR)
	folder_contents.remove_at(folder_contents.find("terminal_command.gd"))
	
	var cmd_files: Array[String] = []
	for file in folder_contents:
		if file.ends_with(".gd"):
			cmd_files.append(file)
	
	return cmd_files
