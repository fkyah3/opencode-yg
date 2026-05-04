extends TerminalCommand


func _init() -> void:
	call_name = "pwd"


func execute(terminal: Terminal, args: Array[String]) -> void:
	if args.size() > 0:
		terminal.push_line_to_output(
			"Invalid number of arguments, expected 0, found %s." % [args.size()]
		)
		return
	
	terminal.push_line_to_output(
		terminal.virtual_path_manager.get_path()
	)


func usage() -> Array[String]:
	return [
		"Pwd - Prints the working directory.",
		"USAGE:",
		"Takes no arguments.",
		"Prints the current directory path in the terminal."
	]
