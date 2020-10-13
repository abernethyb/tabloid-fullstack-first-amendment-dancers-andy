import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, Card, CardImg, CardBody, Button } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { TagProvider } from "../../providers/TagProvider";
import TagsForPost from "./TagsForPost"



const PostDetail = () => {
    const [post, setPost] = useState();
    const { getSinglePost } = useContext(PostContext);
    const { postId } = useParams();
    const history = useHistory();
    const [showTags,setShowTags] = useState(false)
    

    useEffect(() => {
        getSinglePost(postId).then(setPost);
    }, []);

    if (!post) {
        return null;
    }


    //convert publication date to MM / DD / YYYY

    const publishDate = new Date(post.publishDateTime)
    console.log(publishDate);
    const HumanPublishDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`


    return (
        <Card className="m-4">
            <button type="button"
                onClick={() => { history.push(`/posts/`) }}>
                Back to list
            </button>
            <strong>{post.title}</strong>
            <p className="text-left px-2">By {post.userProfile.displayName}</p>
            {/* <p className="text-left px-2">Posted by: {post.userProfile.firstName}</p> */}
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>

                <p>{post.content}</p>
                <p>{HumanPublishDate}</p>
                <Link to={`/posts/${post.id}/comments`}><Button className="postCommentButton" color="danger">Comments</Button></Link>
                
                <button type="button"
                    onClick={() => { history.push(`/posts/`) }}>
                    Back to list
                </button>
                <Button className="Post_Tag_Button" color="primary" hidden={showTags} onClick={() => setShowTags(true)}>Manage Tags</Button>
            {showTags &&
            <TagProvider>
                <TagsForPost
                        setShowTags={setShowTags}
                        postId={post.id} /> 
            </TagProvider>
            }
            </CardBody>
        </Card>
        
        
    );
};


export default PostDetail;