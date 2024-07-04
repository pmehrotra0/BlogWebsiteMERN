function CommentsList({ comments }) {
    return (
        <>
            {comments.length !== 0 &&
                <>
                    <h3>Comments: </h3>
                    {comments.map((item, i) => {
                        return <p key={i}>
                            {item.author}: {item.text}
                        </p>
                    })}
                </>
            }
        </>);
}

export default CommentsList;