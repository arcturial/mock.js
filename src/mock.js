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

                    MockedReplica[key] = function()
                    {
                        MockedReplica.mock_called_methods[key].called++;

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


            return MockedReplica;
        }

        return Mock;
    })();


}).call(this);