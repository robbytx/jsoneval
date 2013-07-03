# jsoneval

**A simple utility for evaluating JavaScript against a JSON object.**

## Installing

* Grab [c2013.sh](https://dev.bazaarvoice.com/svn/scratch/users/rmorgan/scripts/c2013.sh) and put it somewhere in your `PATH`
* Clone this repository, and add the directory to your `PATH`
* Install [jsonpp](https://github.com/jmhodges/jsonpp)
* Connect to the BV FULL VPN or be on the BV network

## Usage

This extracts the token definitions:

	$ c2013.sh fdefs | jsoneval 'input.contentTemplateTokens' | jsonpp
 

This extracts a specific feature from feature definitions:

	$ c2013.sh fdefs | jsoneval 'function findFeature(id) {var result; input.categories.forEach(function (category) {category.groups.forEach(function (group) {group.features.forEach(function (feature) {if (feature.id === id) {result = feature}})})}); return result}; findFeature("emailTemplatesEditor")' | jsonpp
