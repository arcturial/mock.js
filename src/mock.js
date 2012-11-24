/**
 * @copyright Copyright© 2012 Chris Brand
 * @see http://www.gnu.org/licenses
 * @license GNU General Public License
 *
 * -------------------------------------------------------------------
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
 * You should have received a copy of the GNU General Public License
 * along with this program.
 * -------------------------------------------------------------------
 */


/**
 * Mock.js is a Javascript resource library that allows the user to
 * 'fake' certain Javascript objects in order to test their functionality
 * properly by assessing the flow a Javascript function execution
 *
 * @author Chris Brand
 * @date 2012-11-24
 * @license GNU General Public License
 */
(function()
{   
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent, functions) 
    { 
        for (var key in parent) 
        { 
            if (__hasProp.call(parent, key) && functions.indexOf(key) > -1 && typeof parent[key] == 'function') 
            {
                child[key] = parent[key];
            }
        }

        return child; 
    };

    /**
     * MockedReplica is a javascript object containing
     * our basic 'mock' test calls.
     */
    MockedReplica = {
        mock_called_methods: {},
        mock_called: function(method)
        {
            return this.mock_called_methods[method].called;
        },
        mock_called_with: function(method)
        {
            return this.mock_called_methods[method].args;
        },
    };

    Mock = (function()
    {
        function Mock(mock, functions)
        {
            if (!(this instanceof Mock)) 
            {
                return new Mock(mock, functions);
            }

            MockedReplica = __extends(MockedReplica, mock, functions);

            /**
             * Override the replica and intercept
             * function calls
             *
             * @todo remove jquery dependency
             */
            $.each(MockedReplica, function(key, value) 
            { 
               
                if (__hasProp.call(MockedReplica, key) && functions.indexOf(key) > -1 && typeof MockedReplica[key] == 'function')
                {
                    MockedReplica.mock_called_methods[key] = {called: 0, args: []};

                    var function_cont = MockedReplica[key]; // the original function call

                    /* override the function call */
                    MockedReplica[key] = function()
                    {
                        MockedReplica.mock_called_methods[key].called++;

                        /* save arguments used for this function call */
                        $.each(arguments, function(arg_key, arg_value) 
                        { 
                            switch(typeof arg_value)
                            {
                                case 'function':
                                    MockedReplica.mock_called_methods[key].args.push('function');
                                    break;
                                case 'object':
                                    MockedReplica.mock_called_methods[key].args.push('object');
                                    break;
                                default:
                                    MockedReplica.mock_called_methods[key].args.push(arg_value);
                            }
                        });

                        return function_cont.apply(MockedReplica, arguments);
                    };
                }
            });

            return MockedReplica; // return a replica
        }

        return Mock;
    })();

}).call(this);