extends TerminalCommand


func _init() -> void:
	call_name = "ls"


func execute(terminal: Terminal, args: Array[String]) -> void:
	if args.size() > 0:
		terminal.push_line_to_output(
			"Invalid number of arguments, expected 0, found %s." % [args.size()]
		)
		return
	
	for directory: String in terminal.virtual_path_manager.list_directories():
		terminal.push_line_to_output(directory)
	
	for file: String in terminal.virtual_path_manager.list_files():
		terminal.push_line_to_output(file)


func usage() -> Array[String]:
	return [
		"Ls - List directory.",
		"USAGE:",
		"Takes no arguments.",
		"Prints all directories and files in the current path"
	]
