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
 * This library helps with the running of QUnit test and runs helper
 * functions such as resetting mocked objects to their normal state
 * once a test completes.
 * 
 * @package Mock.js
 * @author  Chris Brand <chris@cainsvault.com>
 * @license http://www.gnu.org/copyleft/gpl.html GNU General Public License
 */
 
(function()
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

}).call(this);