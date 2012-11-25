Mock.js Testing Utility
=================

Mock.js is a Javascript resource library that allows the user to
'fake' certain Javascript objects in order to test their functionality
properly by assessing the flow of a Javascript function execution.

Table of Contents
-----------------
* Instantiate Mock.js
* Testing using mock_called()
* Testing using mock_called_with()
* Integration with a UnitTest Framework
* License


1. Instantiate Mock.js
------------------

Mock.js requires JQuery in order to run. It has a particular need for the .each() function and will replace this dependency soon.

Before you can test your mocked object, we first need to create it. You can instantiate a mocked version of our object that should also include the mocked functions as follows:

` var mocked = Mock(new Object, ['method1', 'method2']); `

This will create a mocked version of the 'Object' class with 'method1' and 'method2' being mocked methods.

2. Testing using mock_called()
------------------

The function mock_called() is used to test the amount of times a certain method is being called during a
Javascript function execution.

We start out by creating our mocked object and methods and then calling the specific method we want to test.

` var mocked = Mock(new Object, ['method1', 'method2']); `

` mocked.method1() `

In order to test the amount of times a certain function has been called, you can use mock_called as follows:

` mocked.mock_called('method1') `

At this point, mock_called will return 1 (the amount of times the method 'method1' has been called)

3. Testing using mock_called_with()
------------------

Sometimes we need to test the arguments a certain function is called with. We can accomplish this by using the mock_called_with() function.

Again, we create our mocked object.

` var mocked = Mock(new Object, ['method1', 'method2']); `

But this time, we call 'method1' with some arguments.

` mocked.method1(function() {}, this, 'hello!') `

At this point, the assumption is that 'method1' was called with a 'function', 'object' and 'string' as it's parameters...now let us test it.

` mocked.mock_called_with('method1') `

We expect this call to return ['function', 'object', 'hello!']. We can then use an absolute comparison (===) to compare the argument arrays.

4. Integration with a UnitTest Framework
------------------

You can refer to the 'example/' directory for a simple integration with Javascript QUnit.

5. License
------------------

* Copyright© 2012 Chris Brand
* GNU General Public License
* see http://www.gnu.org/licenses