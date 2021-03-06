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
* Spy/Mock global methods
* Releasing Mocks
* Integration with a UnitTest Framework
* License


1. Instantiate Mock.js
------------------

Mock.js hooks into an object like a spy and monitors certain assertions on the method:

```javascript
var mocked = Mock.Spy(new Object, 'method1');
```

This will create a spy on the 'Object' class for 'method1'.

2. Testing using called()
------------------

The function `called()` is used to test the amount of times a certain method is being called during a
Javascript function execution.

We start out by creating our mocked object and methods and then calling the specific method we want to test.

```javascript
var object = new Object()

var mocked = Mock.Spy(object, 'method1');

object.method1()
```

In order to test the amount of times a certain function has been called, you can use mock_called as follows:

```javascript
mocked.called()
```

At this point, called() will return 1 (the amount of times the method 'method1' has been called)

3. Testing using calledWith()
------------------

Sometimes we need to test the arguments a certain function is called with. We can accomplish this by using the `calledWith()` function.

Again, we create our mocked object.

```javascript
var object = new Object()

var mocked = Mock.Spy(object, 'method1');
```

But this time, we call 'method1' with some arguments.

```javascript
object.method1(this, 'hello!')
```

At this point, the assumption is that 'method1' was called with an 'Object' and 'string' as it's parameters...now let us test it.

```javascript
mocked.calledWith()
```

We expect this call to return [this, 'hello1']. We can then use an absolute comparison (===) to compare the argument arrays.

4. Testing using returnedWith()
------------------

Similar to calledWith(), we might like to sometimes check if a function returned an expected result. We can achieve this using `returnedWith()`

Again, we create our mocked object...but this time we give the method a response.

```javascript
var object = new Object()

object.method1 = function() { return 'hello'; }

var mocked = Mock.Spy(object, 'method1');
```

Let's call the method and see if returned what it should.

```javascript
object.method1()
```

We can now use the mocked object to assert the response of this method.

```javascript
mocked.returnedWith()
```

We expect this call to return 'hello'. You might think that you don't have to even use a mock to determine this
and can just call the function directly, but sometimes it's not possible to call functions directly...and then this
function is very handy.

5. Spy/Mock global methods
------------------

Sometimes you need to spy on or overwrite methods such as jQuery.ajax, you can achieve this using a spy or consume().
In order to check if a global method was called, we can use a normal spy.

```javascript
var spy = Mock.Spy(jQuery, "ajax");

jQuery.ajax({"url": "example.js"});

alert(spy.called());
```

This should output '1' in your browser, since the global method was called once. Now if we want to completely stop
ajax requests while testing, but still test the function...we can utilize consume().

```javascript
var spy = Mock.Spy(jQuery, "ajax");

spy.consume('ajax result');

jQuery.ajax({"url": "example.js"});

alert(spy.called());

alert(spy.returnedWith());
```

Calling consume(result) means that a method will now return the specified result instead of completing it's normal flow. In this case,
the method was called once and it returnedWith 'ajax result' instead of trying to load `example.js`.

There are some cases where returning a predefined mock result isn't the best way to write your test.  In these scenarios, you can use consumeWithFake() instead to pass an executable method into the spy.

```javascript
var spy = Mock.Spy(jQuery, "ajax");

spy.consumeWithFake(function (opts) {
  // do something with opts, then return a result
});

jQuery.ajax({"url": "example.js"});

alert(spy.called());

alert(spy.returnedWith());

Calling consumeWithFake() means that the method's arguments will now be passed to the mocked method, and returnedWith() will be that method's return value.

NOTE: Unfortunately using `consume/consumeWithFake` only works on synchronous ajax request for now.

6. Releasing Mocks
------------------

It is good practice to `release()` mocks when you are done with them. If you don't release mocks and spies, they will sit around silently keeping track
of method calls and potentially skewing results. Here is an example of a unreleased spy that will cause your test to fail.

```javascript
var spy = Mock.Spy(jQuery, "ajax");

spy.consume('ajax result');

jQuery.ajax({"url": "example.js"});
```

This overrides the jQuery.ajax functions default behaviour, but if you then need the use jQuery.ajax generic functionality...it won't work.

```javascript
jQuery.ajax({"url": "example.js"}).done(function() { alert("done"); });
```

This will fail, since the result you specified for jQuery.ajax is no longer an instance of the object, but instead a string. To stop this, you can simply call
` spy.release() `...like this.

```javascript
var spy = Mock.Spy(jQuery, "ajax");

spy.consume('ajax result');

jQuery.ajax({"url": "example.js"});

spy.release();

jQuery.ajax({"url": "example.js"}).done(function() { alert("done"); });
```

Spies are automatically released in QUnit tests.


7. Integration with a UnitTest Framework
------------------

You can refer to the 'example/' directory for a simple integration with Javascript QUnit.

8. License
------------------

* Copyright© 2012 Chris Brand
* GNU General Public License
* see http://www.gnu.org/licenses
