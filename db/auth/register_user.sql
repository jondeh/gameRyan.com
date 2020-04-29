insert into users (firstname, lastname, username, email, password)
values (
    ${firstname},
    ${lastname},
    ${username},
    ${email},
    ${password}
)

returning firstname, lastname, username, email, password, image;