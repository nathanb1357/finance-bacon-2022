## Finance Bacon

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
* Hi my name is Nathan. I'm excited to work on this project because it will help me to improve my skills.
* Hi my name is Ben. I'm excited about this project because...
* Hi my name is Charles. I'm exited about this project because

## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* Firebase
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── 404.html                 # 404 error when page is not found
├── add-expenses.html        # HTML page for adding a new expense
├── add-income.html          # HTML page for adding a new income
├── budget-creator-1.html    # HTML page for adding expense categories when creating a new budget on first login
├── budget-creator-2.html    # HTML page for adding income sources when creating a new budget on first login
├── budget-editor-1.html     # HTML page for editing expense categories after the budget has been created
├── budget-editor-2.html     # HTML page for editing income sources after the budget has been created
├── expense-editor.html      # HTML page for editing and viewing past expense forms
├── graphs.html              # HTML page that holds every type of graph for the user to see
├── home.html                # HTML homepage for Finance Bacon, redirects to index.html if user is not signed in
├── income-editor.html       # HTML page for editing and viewing past income forms
├── index.html               # landing HTML page, this is what users see when you come to url
├── login.html               # HTML page used for authentication
├── notifications.html       # HTML page for adjusting the user's notification settings
├── profile-settings.html    # HTML page for adjusting the user's profile settings
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /bacon-background.jpg        # background for the landing page
    /checkmark.png               # checkmark icon for landing page points
    /green-logo.jpg              # small app-sized icon for the landing page
    /logo.jpg                    # our app logo with a transparent background
├── scripts                  # Folder for scripts
    /add-expenses.js             # JS script for displaying collections and adding new expenses to the database
    /add-income.js               # JS script for displaying collections and adding new income to the database
    /authentication.js           # JS script for authenticating the user with Firebase
    /budget-creator-1.js         # JS script for creating default expense categories and allowing the user to change them
    /budget-creator-2.js         # JS script for creating default income categories and allowing the user to change them
    /budget-editor-1.js          # JS script for editing existing expense categories
    /budget-editor-2.js          # JS script for editing existing income sources
    /expense-editor.js           # JS script for viewing and editing expense documents from the collection
    /graphs.js                   # JS script for displaying graphs using the user's income and expenses
    /home.js                     # JS script for customizing the user's home page and checking user status
    /income-editor.js            # JS script for viewing and editing income documents from the collection
    /notifications.js            # JS script for displaying and changing the user's notification settings
    /profile.js                  # JS script for displaying and changing the user's profile settings
    /skeleton.js                 # JS script for displaying the navbar and footer across pages
├── styles                   # Folder for styles
    /add-expenses.css            # CSS style for the add income page
    /add-income.css              # CSS style for the add expenses page
    /budget-creator-1.css        # CSS style for the first page of the budget creator and budget editor
    /budget-creator2.css         # CSS style for the second page of the budget creator and budget editor
    /expense-editor.css          # CSS style for the expense editor page
    /graphs.css                  # CSS style for the Graphs page
    /home.css                    # CSS style for the user homepage
    /income-editor.css           # CSS style for the income editor page
    /index.css                   # CSS style for our landing page
    /login.css                   # CSS style for our login page
    /notifications.css           # CSS style for our notifications settings
    /profile-settings.css        # CSS style for our profile settings
├── text                     # Folder for html inserted with scripts
    /budget-link.html            # HTML hero inserted when user does not have a budget
    /expense-error.html          # HTML message for graphs when expenses > income
    /footer.html                 # HTML footer inserted with skeleton.js
    /navbar.html                 # HTML navbar inserted with skeleton.js
    /no-data.html                # HTML message for graphs when there is not enough data
```

## Contact 
* Nathan Bartyuk - nbartyuk@my.bcit.ca 
* Charles Kim - ckim163@my.bcit.ca
* Benny Li - bli129@my.bcit.ca

## Acknowledgements
* <a href="https://getbootstrap.com/">Bootstrap</a>
* <a href="https://www.chartjs.org/">Chart.js</a>
* <a href="https://firebase.google.com/">Firebase</a>
