import React from "react";

const Post = ({name, password, title, text, viewsCount, id, createdAt, updatedAt, countTen, resCountTen, deletePostButtonHandler, editPostButtonHandler}) => {

    return (
        <div className="post-content">
            <p>{'id: ' + id}</p>
            <p>{'title: ' + title}</p>
            <p>{'text: ' + text}</p>
            <p>{'countTen: ' + countTen}</p>
            <p>{'resCountTen: ' + resCountTen}</p>
            <p>{'createdAt: ' + createdAt}</p>
            <button 
                disabled={false} 
                onClick={() => editPostButtonHandler(id)}>Редактировать пост</button>
            <button disabled={false} onClick={() => deletePostButtonHandler(id)}>Удалить пост</button>
            {/* <p>{`updatedAt ${updatedAt}`}</p> */}
        </div>
    )
}

export default Post