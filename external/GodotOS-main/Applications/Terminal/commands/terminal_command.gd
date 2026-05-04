extends Resource
class_name TerminalCommand
## Base class that all commands need inherit from.
##
## If not setup correctly the program will [b]CRASH[/b].

## Name used to match user input with a command.
var call_name: String = ""

## Called when the command is instantiated.[br]
## Used to setup command properties, like [param call_name] for example.
func _init() -> void:
	assert(false, "Not implemented, setup the call_name variable here")


## The main entry point of the command, all core logic goes here.
@warning_ignore("unused_parameter")
func execute(terminal: Terminal, args: Array[String]) -> void:
	assert(false, "Not implemented, the command main code goes here")


## Called by "help" command or arbitrary by the command itself.
func usage() -> Array[String]:
	assert(false, "Not implemented, the command usage instructions goes here")
	
	return []
