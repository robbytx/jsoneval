jsoneval
========

Simple utility for evaluating JavaScript against a JSON object

	# Extracts the token definitions
	$ c2013.sh fdefs |jsoneval 'input.contentTemplateTokens' |jsonpp
 
	# Extracts a specific feature from feature definitions:
	$ c2013.sh fdefs |jsoneval 'function findFeature(id) {var result; input.categories.forEach(function (category) {category.groups.forEach(function (group) {group.features.forEach(function (feature) {if (feature.id === id) {result = feature}})})}); return result}; findFeature("emailTemplatesEditor")' |jsonpp
