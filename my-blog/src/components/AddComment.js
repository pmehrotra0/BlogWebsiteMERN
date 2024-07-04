function AddComment({ articleId }) {
    const { commentDetails, setCommentDetails } = useState({
        author: "",
        text: "",
    })
    return (
        <>
            <div>
                <input
                    onChange={(e) => {
                        setCommentDetails({
                            ...commentDetails,
                            author: e.target.value
                        })
                    }}
                    type="text"
                    value={commentDetails.author}
                    placeholder="Enter Name"
                />
                <textarea onChange={(e) => {
                    setCommentDetails({
                        ...commentDetails,
                        text: e.target.value
                    })
                }} value={commentDetails.text} placeholder="Add Comment.." />
            </div>
        </>);
}

export default AddComment;