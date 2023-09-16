---
title: "Free hosting with GitHub pages"
description: ''
pubDate: 'May 09 2019'
---

With the use of GitHub pages and Cloudflare, it is very possible to host your own static website over HTTPS for free. However, there are a few pre-requisites:

- A GitHub account (register [here](https://github.com/join))
- A CloudFlare account (register [here](https://dash.cloudflare.com/sign-up))
- An installation of [Hugo](https://gohugo.io/getting-started/installing/) (Optional, this was my choice of static site generators)

Once you have signed up to both of the services the first thing to do is create yourself a new GitHub repository

## Setting up GitHub Pages

### Step 1 - Create a new repository
![new_repository](/img/blog/free_hosting_github_pages/new_repository.jpg)
First, we need to create a new GitHub repository, use a name with the following naming convention: `<your username/organisation>.github.io`

### Step 2 - Clone your new repository
![clone_repository](/img/blog/free_hosting_github_pages/clone_repository.jpg)
Once we have set up our new repository we now need to clone it. To do so should be as simple as copying the link visible on the page and running `git clone <your repository link>`

once the repository has been cloned you need to open of command terminal and navigate to the folder of your repository and execute the following commands:

1. `git init`
2. `git add README.md`
3. `git commit -m "first commit"`
4. `git remote add origin <your repository link>`
5. `git push -u origin master`

### Step 3 - Set up Hugo (optional)
The first step to setting up Hugo in your repository is to open up a command prompt and navigate to your repository folder. Once there you need to execute the following command `hugo new site src` this will create a new Hugo site in a folder called `src`. You also need to create a folder in the root of your repository called `docs`. The last step is to update the `config.toml` file in the root of the `src` directory. You simply need to add the following line `publishDir = "../docs/"`.

Once you have completed the previous steps you simply need to execute the `hugo` command in the `src` directory and then commit all changes and push them to source control. 

### Step 4 - Create a CNAME file (optional)
This step is only for those of you who have a custom domain and wish to use it.
Once we have a local copy of our new repository the next step is to create a CNAME file which points to our custom domain. <a href="/download/blog/free_hosting_github_pages/CNAME" download>Here</a> is an example file which you can use, just replace the domain with your own.

Once you have a CNAME file simply need to commit and push it to the root of your repository (or in the docs folder if you decided to go through step 3).

## Setting up CloudFlare (Optional)

### Step 1 - Registering your site
![cloudflare_register](/img/blog/free_hosting_github_pages/cloudflare_register.jpg)
Once you have set up your GitHub pages website the next step is to register your custom domain with Cloudflare. Log into your Cloudflare account and add your site using the page above and follow the onscreen instructions.

### Step 2 - Configuring DNS
![cloudflare_dns](/img/blog/free_hosting_github_pages/cloudflare_dns.jpg)
Once you have registered your site and it has been verified, you are now ready to configure the DNS records to make sure we can access your GitHub pages website via your custom domain.

All you need to do is simply create a CNAME record with the name of `www` and the value of your GitHub pages account e.g `<your username/organisation>.github.io`.

### Step 3 - Enable HTTPS (Recommended)
To enable https you need to navigate to the `SSL/TLS` tab and specify your SSL certificate to be `Full`.

### Step 4 - Enable caching (Recommended)
To enable caching you need to navigate to the `caching` tab and set the caching level to `Standard`.

## Conclusion
And there you have it, you should now have a fully functional website on your own custom domain with absolutely no hosting fees.