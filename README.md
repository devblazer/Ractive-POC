[View Demo](https://devblazer.github.io/Ractive-POC/)

The POC demonstrates the basic technology requirement for the new slicer of being able to drag items between multiple drop targets and being able to re-order them.

It is broken up into a few different components each of which is broken up into three files:

.hbs Is a handlebars template file. Even though Ractive largely uses mustache as its templating language, it is a custom flavour of it that incorporates several of handlebars features, for this reason I chose to use handlebars files for better syntax highlighting.

.scss Is used for css, due to its great pre processing features.

.js Used to hold the component code and import the scss and hbs files each time.

The Ractive POC has been created with the webpack build stack due to its numerous advantages it brings to the table.
One Ractive specific example of this is the ractive-loader.  There are two main variations of Ractive component webpack loaders: 

One that loads a .html file that contains all css, template and js code in one file via style and script tags.  And the other that loads a separate template file (in this case my hbs file).  

The ractive-loader Im using to import the hbs file each time has the distinct advantage of being able to pre-compile the ractive template into ractive's custom json compiled format, and it does this at build time, so that ractive doesn't have to perform this costly step at run time.

Another advatage is being able to use scss or any other css preprocesser via separate webpack-loaders, since it is a separate file, unlike an inline style tag that cannot support such things.
