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
    }

     /**
      * This function will be called once by callMe()
      */
    this.callMeThree = function()
    {
        this.callMeTwo('arg1', 'arg2');
    }
}