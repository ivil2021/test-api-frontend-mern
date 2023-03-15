import React from "react";
import './post.css';

// Метод Date.now()
// Метод Date.now() возвращает дату сразу в виде миллисекунд.

// Технически, он аналогичен вызову +new Date(), 
// но в отличие от него не создаёт промежуточный объект даты, а поэтому – во много раз быстрее.

// Его использование особенно рекомендуется там, где производительность при работе с датами критична.
//  Обычно это не на веб-страницах, а, к примеру, в разработке игр на JavaScript.

const Post = ({name, password, title, text, viewsCount, id, createdAt, updatedAt, countTen, resCountTen, deletePostButtonHandler}) => {
//     Mongodb использует ISO8601 date/time формат (Z – значит UTC)
// 2021-03-21T09:58:51.000Z

// YYYY-MM-DDThh:mm:ss.SSS

    // const date = createdAt;

    // console.log(date.getMilliseconds()
    // );

    const now = new Date(); // текущая дата
    // console.log('now in miliseconds', Date.parse(now.toJSON()));
//var dateString = now.toJSON(); // строка с датой в UTC; удобно хранить в mongo
var postCreatedDate = new Date(createdAt); // преобразовали строку обратно в объект
const dateInMiliseconds = Date.parse(postCreatedDate.toJSON());
const dateInSeconds = dateInMiliseconds / 1000;

console.log(Date.parse(now.toJSON()) - dateInMiliseconds); // date in miliseconds

//const dateString = createdAt.toJSON(); // строка с датой в UTC; удобно хранить в mongo
// console.log(parsedDate);
// console.log('----------');
// console.log(parsedDate.toJSON());

// console.log(Date.parse(postCreatedDate.toJSON())); // date in miliseconds
// console.log('date in miliseconds', dateInMiliseconds); // date in miliseconds
// console.log('date in seconds', dateInSeconds); // date in seconds

//console.log(Date.parse(postCreatedDate)); // date in miliseconds

// Date.parse
// getMilliseconds()
    return (
        <div className="post-content">
            <p>{'id: ' + id}</p>
            <p>{'title: ' + title}</p>
            <p>{'text: ' + text}</p>
            <p>{'countTen: ' + countTen}</p>
            <p>{'resCountTen: ' + resCountTen}</p>
            <p>{'createdAt: ' + createdAt}</p>
            <button disabled={false}>Редактировать пост</button>
            <button disabled={false} onClick={() => deletePostButtonHandler(id)}>Удалить пост</button>
            {/* <p>{`updatedAt ${updatedAt}`}</p> */}
        </div>
    )
}

export default Post;