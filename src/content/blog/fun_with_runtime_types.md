---
title: "Having fun with .Net's System.Reflection.Emit"
description: ''
pubDate: 'June 31 2020'
---

I recently decided to undertake some interesting work around building a library .Net Core style host builder for Xamarin apps. As part of that work I encountered a strange hurdle. Essentially, I needed to define a brand new type that extended a base class and implemented an interface...all at runtime. At first, it seemed better to completely avoid this scenario; however, in the goal of complete simplicitly and readability of the end-user code needed for this library, I decided to tackle this challenge head on!

### Step 1 - To actually define a type at runtime...
The first task was of course to actually build this mysterious type at runtime. Luckily [System.Reflection.Emit](https://docs.microsoft.com/en-us/dotnet/api/system.reflection.emit?view=netcore-3.1) has us covered. This assembly allows us to generate in-memory assemblies and take use of the [TypeBuilder](https://docs.microsoft.com/en-us/dotnet/api/system.reflection.emit.typebuilder?view=netcore-3.1). To generate a simple type looks something like this:
```csharp
public Type GenerateType() 
{
   // Build the dynamic assembly
   var assemblyBuilder = AssemblyBuilder.DefineDynamicAssembly("SuperFancyAssembly", AssemblyBuilderAccess.Run);

   // Build the dynamic type
   var typeBuilder = assemblyBuilder.DefineDynamicModule("SuperFancyModule")
        .DefineType($"SuperFancyType");

   return typeBuilder.CreateTypeInfo();
}

```


### Step 2 - Inherit the base class and implement the interface
Of course, generating a type is all fine and dandy but it is not quite as fun if we do not inherit a class or implement an interface. Doing that is actually much simpler than it sounds. Take a look:
```csharp
public Type GenerateType() 
{
   // Build the dynamic assembly
   var assemblyBuilder = AssemblyBuilder.DefineDynamicAssembly("SuperFancyAssembly", AssemblyBuilderAccess.Run);
   // Build the dynamic type
   var typeBuilder = assemblyBuilder.DefineDynamicModule("SuperFancyModule")
        .DefineType($"SuperFancyType");

   // Add the interface implementation
   typeBuilder.AddInterfaceImplementation(typeof(ISuperFancyInterface));

   // Inherit the base class
   typeBuilder.SetParent(typeof(SuperFancyBaseClass));

   return typeBuilder.CreateTypeInfo();
}

```


### Step 3 - Inject IL to generate pass-through constructors (The worst bit)
This is where things get a little bit more complicated.The first thing we need to do is to copy over the constructors from our `SuperFancyBaseClass`:
```csharp
// Get all of the constructors from the SuperFancyBaseClass type
var constructors = typeof(SuperFancyBaseClass).GetConstructors(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);

// Loop through each constructor
foreach (var constructor in constructors)
{
   // Get all of the parameters from the constructor
   var parameters = constructor.GetParameters();

   // Get all of the types from parameters
   var parameterTypes = parameters.Select(p => p.ParameterType).ToArray();
   
   // Build the new constructor on the new type we are creating
   var newConstructor = typeBuilder.DefineConstructor(MethodAttributes.Public, constructor.CallingConvention, parameterTypes);

   // Loop through each parameter in the constructor
   for (var i = 0; i < parameters.Length; ++i)
   {
      var parameter = parameters[i];
      // Define the parameter
      var parameterBuilder = newConstructor.DefineParameter(i + 1, parameter.Attributes, parameter.Name);
   }
}
```

Now we have defined the constructors, we need to generate the IL to call into our base constructors:

```csharp
// Get the IL generator from the new constructor we defined earlier
var emitter = newConstructor.GetILGenerator();
emitter.Emit(OpCodes.Nop);

// Load `this` and call base constructor with arguments
emitter.Emit(OpCodes.Ldarg_0);
for (var i = 1; i <= parameters.Length; ++i)
{
    emitter.Emit(OpCodes.Ldarg, i);
}
emitter.Emit(OpCodes.Call, constructor);

emitter.Emit(OpCodes.Ret);
```

Once we put it all together it should look something like this:

```csharp
public Type GenerateType() 
{
   // Build the dynamic assembly
   var assemblyBuilder = AssemblyBuilder.DefineDynamicAssembly("SuperFancyAssembly", AssemblyBuilderAccess.Run);
   // Build the dynamic type
   var typeBuilder = assemblyBuilder.DefineDynamicModule("SuperFancyModule")
        .DefineType($"SuperFancyType");

   // Add the interface implementation
   typeBuilder.AddInterfaceImplementation(typeof(ISuperFancyInterface));

   // Inherit the base class
   typeBuilder.SetParent(typeof(SuperFancyBaseClass));

   // Get all of the constructors from the SuperFancyBaseClass type
    var constructors = typeof(SuperFancyBaseClass).GetConstructors(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);

    // Loop through each constructor
    foreach (var constructor in constructors)
    {
        // Get all of the parameters from the constructor
        var parameters = constructor.GetParameters();

        // Get all of the types from parameters
        var parameterTypes = parameters.Select(p => p.ParameterType).ToArray();
        
        // Build the new constructor on the new type we are creating
        var newConstructor = typeBuilder.DefineConstructor(MethodAttributes.Public, constructor.CallingConvention, parameterTypes);

        // Loop through each parameter in the constructor
        for (var i = 0; i < parameters.Length; ++i)
        {
            var parameter = parameters[i];
            // Define the parameter
            var parameterBuilder = newConstructor.DefineParameter(i + 1, parameter.Attributes, parameter.Name);
        }

        // Get the IL generator from the new constructor we defined earlier
        var emitter = newConstructor.GetILGenerator();
        emitter.Emit(OpCodes.Nop);

        // Load `this` and call base constructor with arguments
        emitter.Emit(OpCodes.Ldarg_0);
        for (var i = 1; i <= parameters.Length; ++i)
        {
            emitter.Emit(OpCodes.Ldarg, i);
        }
        emitter.Emit(OpCodes.Call, constructor);

        emitter.Emit(OpCodes.Ret);
    }

   return typeBuilder.CreateTypeInfo();
}
```

And there you have it! We just defined our own type, implemented an interface, inherited a base class, defined a constructor and called the base constructor all at runtime.

Click [here](https://github.com/hostly-org/hostly/blob/master/src/Hostly/XamarinApplicationBuilder.cs) for the source code in action


TLDR: I needed to implement an interface to an existing class at runtime, which required some fun with dynamic assemblies and IL generation