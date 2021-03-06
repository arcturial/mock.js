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
 * Mock.js is a lightweight Javascript Mock Library for testing. It creates
 * easy spies to "spy" on method called and report back.
 * 
 * @package Mock.js
 * @author  Chris Brand <chris@cainsvault.com>
 * @license http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */
 
(function()
{       
    Mock = {
        listeners: [],
        trigger: function(event, spy)
        {
            for (var i = 0; i < this.listeners.length; i++)
            {
                if (this.listeners[i].label == event)
                {
                    /* call listener */
                    this.listeners[i].func(spy);
                }
            }
        },
        created: function(callback)
        {
            this.listeners.push({"label": "created", "func": callback});
        }
    };

    Mock.Spy = (function()
    {
        function Spy(obj, method)
        {
            if (!(this instanceof Spy)) 
            {
                return new Spy(obj, method);
            }

            var context = this;

            this.track = {};
            this.track.callCount = 0;
            this.track.calledWith = [];
            this.track.returnedWith = null;

            this.consume = {};
            this.consume.consume = false;
            this.consume.result = true;
            this.consume.resultFake = null;

            /* the original function call */
            this.function_cont = obj[method];
            
            if (typeof context.function_cont == "undefined")
            {
                throw "unable to mock method '" + method + "'.";
            }

            /* spy on the object */
            obj[method] = function()
            {   
                /* increase called count */
                context.track.callCount++;

                /* save arguments used for this function call */
                for (var i = 0; i < arguments.length; i++)
                {
                    context.track.calledWith.push(arguments[i]);
                }

                /* save the response of the method */
                if (context.consume.consume) 
                {
                    /* returned mock result, ignore original execution */
                    if (typeof context.consume.resultFake === 'function') {
                        context.track.returnedWith = context.consume.resultFake.apply(obj, arguments);
                    } else {
                        context.track.returnedWith = context.consume.result;
                    }
                }
                else 
                {
                    /* call original execution */
                    context.track.returnedWith = context.function_cont.apply(obj, arguments);
                }

                return context.track.returnedWith; 
            };

            // returns the amount of times the method was called
            this.called = function()
            {
                return context.track.callCount;
            }

            // returns the arguments the method was called with
            this.calledWith = function()
            {
                return context.track.calledWith;
            }

            // returns the response of the method
            this.returnedWith = function()
            {
                return context.track.returnedWith;
            }

            // consumes the original method, stopping it from executing 
            this.consume = function(result)
            {
                context.consume.consume = true;
                context.consume.result = result;

                return context;
            }

            this.consumeWithFake = function(fake) {
                context.consume.consume = true;
                context.consume.resultFake = fake;

                return context;
            };

            // release any mocked consumptions and return method original states
            this.release = function()
            {
                obj[method] = context.function_cont;

                return context;
            }
            
            /* trigger created event */
            Mock.trigger('created', context);
        }

        return Spy;
    
    })();



    // Logic to release mocks after QUnit test case.
    if (typeof QUnit !== 'undefined')
    {
        MockQUnit = {};
        MockQUnit.spies = [];

        Mock.created(function(spy)
        {
            /* add spy to the test tracker once created */
            MockQUnit.spies.push(spy);
        });

        QUnit.testStart(function()
        {
            /* reset test tracker */
            MockQUnit.spies = [];
        });

        QUnit.testDone(function()
        {
            /* release all spies */
            for (var i = 0; i < MockQUnit.spies.length; i++)
            {
                MockQUnit.spies[i].release();
            }
        });
    }

}).call(this);