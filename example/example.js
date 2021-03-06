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
 * Test class for examples.
 *
 * @author Chris Brand
 * @date 2012-11-24
 * @license GNU General Public License
 */
function TestObject()
{
    /**
     * Function call. This function is expected to
     * call two other functions
     */
    this.callMe = function()
    {
        this.callMeTwo();
        this.callMeThree();
    }

    /**
     * This function will be called by callMe() and callMeThree()
     */
    this.callMeTwo = function()
    {
        /* end of line */
        return "call two result";
    }

     /**
      * This function will be called once by callMe()
      */
    this.callMeThree = function()
    {
        this.callMeTwo('arg1', 'arg2');
    }
}