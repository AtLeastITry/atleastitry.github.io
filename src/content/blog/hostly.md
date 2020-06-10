---
title: ".Net core host builder for Xamarin? Yes please!"
slug: "hostly"
keywords: "xamarin c# .Net iOS Android xamarin.forms cross-platform"
date: 2020-06-10T16:36:14+01:00
draft: false
---

This year I decided to embark on the journey of developing a .Net Core style host builder for Xamarin. I had previously seen examples using the `HostBuilder` provided by the .Net Core framework. While this approach was perfectly fine and works as intended, I found myself wanting something a little more integrated with Xamarin. Enter [Hostly](https://github.com/hostly-org/hostly), a framework that provides end-users with a custom `Ihost` tailored to `Xamarin.Forms`. It's as simple as running a few lines of code in your entry class (`FormsAppCompatActivity` in Android, or `FormsApplicationDelegate` in iOS):
```csharp
new XamarinHostBuilder().UseApplication<App>()
.UsePlatform(this)
.Build()
.StartAsync();
``` 

Using Hostly opens up access to a rich set of useful features when developing a Xamarin app. A few of those being:
- Navigation Middleware
- Lifecycle Middleware (In progress)
- Dependency Injection
- EF.Core
- Hosted services

Try it out for yourself [here](https://github.com/hostly-org/hostly)