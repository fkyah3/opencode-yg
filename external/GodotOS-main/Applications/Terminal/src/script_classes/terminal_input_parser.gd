class_name TerminalInputParser
## Utility class used for sanitizing and parsing Strings.
##
##Example:
##[codeblock]
##var parser := TerminalInputParser.new()
##var outputs: Array[ParserOuput] = parser.parse("echo hello && echo world"))
##
##print(output[0].command_call_name)# prints "echo"
##print(output[0].command_args)# prints ["hello"]
##print(output[1].command_args)# prints ["world"]
##[/codeblock]


## Sanitize and parse the given String, returning all founded commands.[br]
##
## Trailing spaces will be removed and quotations merge words in one argument.[br]
## First we find and split the input, delimited by "&&"(and), then we parse all the individual commands.
##[codeblock]
##echo hello world -> ["echo", ["hello", "world"]]
##echo "hello world" -> ["echo", ["hello world"]]
##echo hello && echo world -> [["echo", ["hello"]], ["echo", ["world"]]
##[/codeblock]
func parse(input: String) -> Array[TerminalParserOutput]:
	# Return early if empty String
	if input == "" or input.count(" ") == input.length():
		return []
	
	var sub_inputs: PackedStringArray = input.split("&&", false)
	var outputs: Array[TerminalParserOutput] = []
	
	for inp: String in sub_inputs:
		var parsed_input: Array[String] = []

		# Remove all useless characters from the edges of the string.
		inp = inp.strip_edges()
	
		var current_substring: String = ""
		var inside_quotes: bool = false
		for input_char: String in inp:
			if input_char == '"':
				inside_quotes = not inside_quotes
			
			elif input_char == ' ' and not inside_quotes:
				parsed_input.append(current_substring)
				current_substring = ""
			
			else:
				current_substring += input_char
	
		# Appends the last argument
		# Doing here because with no space at the end
		# the last argument is ignored by the loop
		parsed_input.append(current_substring)
		
		outputs.append(
			TerminalParserOutput.new(
				parsed_input[0],
				parsed_input.slice(1, parsed_input.size())# Get rid of the first element, the command_call_name
			)
		)
	
	return outputs
