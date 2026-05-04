extends TerminalCommand


func _init() -> void:
	call_name = "date"


func execute(terminal: Terminal, args: Array[String]) -> void:
	if args.size() > 0:
		terminal.push_line_to_output(
			"Invalid number of arguments, expected 0, found %s." % [args.size()]
		)
		return
	
	var date_dict: Dictionary = Time.get_datetime_dict_from_system()
	var hour_suffix: String
	if date_dict.hour >= 12:
		date_dict.hour -= 12
		hour_suffix = "PM"
	else:
		hour_suffix = "AM"
		if date_dict.hour == 0:
			date_dict.hour = 12
	
	var day_string: String = "%s %02d/%02d/%d" % [
		get_weekday_string(date_dict.weekday).left(3),
		date_dict.day, date_dict.month, date_dict.year
	]
	var hour_string: String = " %02d:%02d %s" % [
		date_dict.hour, date_dict.minute, hour_suffix
	]
	
	terminal.push_line_to_output(
		day_string + hour_string
	)


func usage() -> Array[String]:
	return [
		"Date - Prints DateTime.",
		"USAGE:",
		"Takes no arguments.",
		"Prints the current date and time in the terminal."
	]


func get_weekday_string(weekday: Time.Weekday) -> String:
	match weekday:
		Time.WEEKDAY_SUNDAY:
			return "Sunday"
		Time.WEEKDAY_MONDAY:
			return "Monday"
		Time.WEEKDAY_TUESDAY:
			return "Tuesday"
		Time.WEEKDAY_WEDNESDAY:
			return "Wednesday"
		Time.WEEKDAY_THURSDAY:
			return "Thursday"
		Time.WEEKDAY_FRIDAY:
			return "Friday"
		Time.WEEKDAY_SATURDAY:
			return "Saturday"
	
	assert(false, "Invalid weekday")
	return ""


func get_month_string(month: Time.Month) -> String:
	match month:
		Time.MONTH_JANUARY:
			return "January"
		Time.MONTH_FEBRUARY:
			return "February"
		Time.MONTH_MARCH:
			return "March"
		Time.MONTH_APRIL:
			return "April"
		Time.WEEKDAY_THURSDAY:
			return "Thursday"
		Time.MONTH_MAY:
			return "May"
		Time.MONTH_JUNE:
			return "June"
		Time.MONTH_JULY:
			return "July"
		Time.MONTH_AUGUST:
			return "AUGUST"
		Time.MONTH_SEPTEMBER:
			return "Setember"
		Time.MONTH_OCTOBER:
			return "October"
		Time.MONTH_NOVEMBER:
			return "November"
		Time.MONTH_DECEMBER:
			return "December"
	
	assert(false, "Invalid month")
	return ""
