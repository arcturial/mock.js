/**
 * ===================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * ===================================================================
 *
 * Test file to ensure Mock.js functionality is working
 * 
 * @package Mock.js
 * @author  Chris Brand <chris@cainsvault.com>
 * @license http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */

var vows = require('vows'), assert = require('assert');

// Get the code to test
require('../src/mock.js')

// Set up the suite
var suite = vows.describe('Mock.js');


// Test basic spy functionality
suite.addBatch({
	'Create a method spy': {
		topic: function() {

			var arr = new Array();
			var mock = Mock.Spy(arr, "push");
			arr.push("element");

			return mock;
		},
		"Assertions callable": {
			"Get method count": function(topic) {
				assert.equal(topic.called(), 1);
			},
			"Get method arguments": function(topic) {
				assert.deepEqual(topic.calledWith(), ["element"]);
			},
			"Get method returned": function(topic) {
				assert.equal(topic.returnedWith(), 1);
			}
		},
		"Assert only instance and not global": {
			"Expect method to be called only once": function(topic) {
				var arr = new Array();
				arr.push("element2");

				assert.equal(topic.called(), 1);
			}
		}
	}
});

// Test spy on methods not directly part of the flow
suite.addBatch({
	'Spy on indirect method execution': {
		topic: function() {

			function TestObject()
			{
				this.methodOne = function()
				{
					this.methodTwo();
				}

				this.methodTwo = function()
				{
					return "done";
				}
			}

			var obj = new TestObject();
			var mock = Mock.Spy(obj, "methodTwo");
			
			obj.methodOne();

			return mock;
		},
		"methodTwo() called once": {
			"Called once": function(topic) {
				assert.equal(topic.called(), 1);
			},
			"Method result = 'done'": function(topic) {
				assert.equal(topic.returnedWith(), 'done');
			}
		}
	}
});

suite.export(module);