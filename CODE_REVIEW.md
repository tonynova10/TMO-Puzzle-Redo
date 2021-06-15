These are my points of the code review

- One problem I detected right away was that the search bar brings coincidences despite the string entry - That will be fixed in task 2
- One improvement I will do on book-search.component is instead if using subscribe() we could use 'async' pipe on the template, in taht way we already subscribe to the books observable and we can remove the ngOnInit function
- Other improvement we can do in book-search component is remove the formatDate funcion and use 'date' pipe, so we can transform the information directly on our template
- In total.count.component we can remove the onInit hook, since we are not using it.

Lighthouse extension issues:
- Buttons do not have an accessible name
- Background and foreground colors do not have a suficient contrast ratio

My errors discoverded 
- The book cards has no border-radius just a a change of color without ratio 
- No separation between elements in reading list
- The "Want to read" text button should change when book is already in the list