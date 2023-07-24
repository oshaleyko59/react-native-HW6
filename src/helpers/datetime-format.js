const formatUA = new Intl.DateTimeFormat("uk-UA", {
	dateStyle: "long",
	timeStyle: "short",
});

export default formatUA.format;
