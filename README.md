jsoneval
========

## Simple utility for evaluating JavaScript against a JSON object

	# Extracts the token definitions
	$ c2013.sh fdefs |jsoneval 'input.contentTemplateTokens' |jsonpp
 
	# Extracts a specific feature from feature definitions:
	$ c2013.sh fdefs |jsoneval 'function findFeature(id) {if (input.features) {return input.features[id];} var result; input.categories.forEach(function (category) {category.groups.forEach(function (group) {group.features.forEach(function (feature) {if (feature.id === id) {result = feature}})})}); return result}; findFeature("emailTemplatesEditor")' |jsonpp

## Install

```bash
git clone git@github.com:robbytx/jsoneval.git
cd jsoneval
npm install -g .
```
