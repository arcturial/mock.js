Mock.js Testing Utility
=================

Master: [![Build Status](https://secure.travis-ci.org/arcturial/mock.js.png?branch=master)](http://travis-ci.org/arcturial/mock.js)

Mock.js is a Javascript resource library that allows the user to
'fake' certain Javascript objects in order to test their functionality
properly by assessing the flow of a Javascript function execution.

Table of Contents
-----------------
* Instantiate Mock.js
* Testing using called()
* Testing using calledWith()
* Testing using returnedWith()
* Integration with a UnitTest Framework
* License


1. Instantiate Mock.js
------------------

Mock.js hooks into an object like a spy and monitors certain assertions on the method:

` var mocked = Mock(new Object, 'method1'); `

This will create a spy on the 'Object' class for 'method1'.

2. Testing using called()
------------------

The function `called()` is used to test the amount of times a certain method is being called during a
Javascript function execution.

We start out by creating our mocked object and methods and then calling the specific method we want to test.

` var object = new Object() `

` var mocked = Mock(object, 'method1'); `

` object.method1() `

In order to test the amount of times a certain function has been called, you can use mock_called as follows:

` mocked.called() `

At this point, called() will return 1 (the amount of times the method 'method1' has been called)

3. Testing using calledWith()
------------------

Sometimes we need to test the arguments a certain function is called with. We can accomplish this by using the `calledWith()` function.

Again, we create our mocked object.

` var object = new Object() `

` var mocked = Mock(object, 'method1'); `

But this time, we call 'method1' with some arguments.

` object.method1(this, 'hello!') `

At this point, the assumption is that 'method1' was called with an 'Object' and 'string' as it's parameters...now let us test it.

` mocked.calledWith() `

We expect this call to return [this, 'hello1']. We can then use an absolute comparison (===) to compare the argument arrays.

4. Testing using returnedWith()
------------------

Similar to calledWith(), we might like to sometimes check if a function returned an expected result. We can achieve this using `returnedWith()`

Again, we create our mocked object...but this time we give the method a response.

` var object = new Object() `

` object.method1 = function() { return 'hello'; } `

` var mocked = Mock(object, 'method1'); `

Let's call the method and see if returned what it should.

` object.method1() `

We can now use the mocked object to assert the response of this method.

` mocked.returnedWith() `

We expect this call to return 'hello'. You might think that you don't have to even use a mock to determine this
and can just call the function directly, but sometimes it's not possible to call functions directly...and then this
function is very handy.

5. Integration with a UnitTest Framework
------------------

You can refer to the 'example/' directory for a simple integration with Javascript QUnit.

6. License
------------------

* Copyright© 2012 Chris Brand
* GNU General Public License
* see http://www.gnu.org/licenses