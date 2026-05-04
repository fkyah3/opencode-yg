extends TerminalCommand


func _init() -> void:
	call_name = "commands"


func execute(terminal: Terminal, args: Array[String]) -> void:
	if args.size() > 0:
		terminal.push_line_to_output(
			"Invalid number of arguments, expected 0, found %s." % [args.size()]
		)
		return
	
	var commands: Array[String] = terminal.command_manager.get_command_call_names()
	commands.sort_custom(
		func(a: String, b: String) -> bool:
			return a.length() < b.length()
	)# Sort by call_name size
	for cmd_name: String in commands:
		terminal.push_line_to_output(cmd_name)


func usage() -> Array[String]:
	return [
		"Commands - List commands.",
		"USAGE:",
		"Takes no arguments.",
		"Prints all valid commands,",
		"in order from shortest to longest."
	]
