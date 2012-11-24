function test()
{
    alert("test");
    this.you('arg');
}

function you(test)
{
    alert(test);
    alert("you");
}

function testobject()
{
    var object = new ObjectToTest();
    object.callme();
}


function ObjectToTest() {
    this.callme = function()
    {
        alert('callme');
    }
}