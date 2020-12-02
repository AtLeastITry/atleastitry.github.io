---
title: "Compilers - One of the more intimidating projects"
slug: "compilers"
keywords: "ANTLR compilers java c# python AST lexical analysis parser"
date: 2020-06-21T16:36:14+01:00
draft: false
---

The terms “compiler” and “Intermediate language” used to be somewhat intimidating to me; that is until I decided to take on the challenge of building my very own compiler. Better yet, to make it a little bit more interesting, I also went ahead and developed it in Java, which is an unusual choice considering I primarily work in C#. Now, this challenge wasn’t so much a quick “look on Stack Overflow and get it done”. It required a lot of reading and research into just how compilers work. Most of my time was spent reading the “Dragon Book”, which, even though might be a bit outdated for the more modern compilers of today, possessed core concepts that are still very much relevant.

Before we dive into the nitty-gritty of my journey, it is important to understand the basic structure of a compiler. I won’t go into full detail as we can save that for another time but the following are the core steps of a simple compiler:
1. Lexical analysis - the compiler processes the source code and outputs a stream of tokens.
2. Parser - the compiler processes the stream of characters and outputs a syntax tree.
3. Intermediate code generator - the compiler processes the syntax tree and outputs some IL.

## How it was built

After installing a useful “compiler-builder” framework called “ANTLR”, the first step was to generate my grammar. This grammar would define exactly how my custom language behaves. I decided to take a strongly typed approach to my language design much like C# as it provides a bit more security against those easy semantical bugs. We all know how confusing enterprise JavaScript projects can get. The full grammar can be found [here](https://github.com/AtLeastITry/antlr-python-compiler/tree/master/src/main/antlr4).

The language I proposed looks a little something like this:

```
int b;
b = factorial(8);
int factorial(int n) {
  int val;
  int counter;
  val = 1;
  counter = 1;
  while(counter <= n) {
    val = val * counter;
    counter = counter + 1;
  };
  return val;
};
print(b);
```

Once the grammar was complete, it was then time to use ANTLR to parse my source code using the grammar and generate an expression tree I could convert into my own AST (abstract syntax tree). Now, this wasn’t the most simple process but I followed the “visitor” pattern to walk through the expression tree one node at a time and then translated those nodes into my own AST. The code for the translation can be found [here](https://github.com/AtLeastITry/antlr-python-compiler/blob/master/src/main/java/compiler/implementation/visitors/ParseVisitor.java).

Now having generated my own AST, the next logical step was to run a semantic analysis to check if there were any errors in the program code I was compiling. This might include errors such as attempting to set a string value to an integer or use a variable before it is declared. The code for the semantic analyzer can be found [here](https://github.com/AtLeastITry/antlr-python-compiler/blob/master/src/main/java/compiler/implementation/visitors/SemanticAnalyser.java).

A little extra challenge I set myself was to allow the compiler to handle unbound declarations, meaning you can call a function before it is declared. Now, this required a bit more research but, in the end, I decided to tackle this problem with a simple dependency graph. My compiler generates the dependency graph after semantic analysis has occurred and then reorders the AST based on the dependencies it has graphed out. To reorder the AST, two pass-throughs must occur. In the first pass-through, the dependency graph is bound to the AST to ensure that all of the variable and function declarations are found. The dependency graph is then re-bound to the AST for the second pass-through to build up the dependencies to the variables and functions discovered in the first pass-through. The code for the dependency graph can be found [here](https://github.com/AtLeastITry/antlr-python-compiler/blob/master/src/main/java/compiler/implementation/visitors/ASTDependencyRetriever.java).

At this point, we’re at the final (and probably easiest) step of my journey - walking the AST to generate something useful. Now, this was as simple as recursively walking each of the nodes using the visitor pattern I mentioned earlier.  I generated a number of “AST visitors”; the most interesting of those being a “Python visitor” which outputted the AST in executable Python code and a “DOT visitor” which outputted the AST in a DOT graph. 

The entire repo of the compiler can be found [here](https://github.com/AtLeastITry/antlr-python-compiler)

## What I learned

Building this compiler was no easy task but it gave me a much deeper understanding of the high-level languages we all take for granted. I, personally, had never seen myself having to worry about symbol tables and dependencies on a low language level. It makes you take a step back and appreciate the work done from some of the clever minds out there behind the popular compilers like Rosyln and Javac. It's an incredible rollercoaster of knowledge getting to understand exactly how the code we write daily gets compiled into machine code and executed. If I could have done anything differently, I would have avoided using ANTLR and, instead, created my own lexer and grammar parser. While ANTLR was great and helped me on this journey, I feel like I skipped some of the learning experiences that I could have gained. I also would have stuck with C#, as it is within my comfort zone. Java was fine but I just had a few minor issues with it, one being the lack of dynamic method overloading as it would have simplified the implementation of the AST Visitors.
