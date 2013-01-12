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
 * Mock.js is a lightweigth Javascript Mock Library for testing. It creates
 * easy spies to "spy" on method called and report back.
 * 
 * @package Mock.js
 * @author  Chris Brand <chris@cainsvault.com>
 * @license http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */
 
(function()
{       
    Mock = {};

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


            // the original function call
            var function_cont = obj[method];
            
            if (typeof function_cont == "undefined")
            {
                throw "unable to mock method '" + method + "'.";
            }

            // spy on the object
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
                context.track.returnedWith = function_cont.apply(obj, arguments)

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
        }

        return Spy;
    })();

}).call(this);