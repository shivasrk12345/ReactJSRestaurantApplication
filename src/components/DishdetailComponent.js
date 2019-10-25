import React,{Component}  from 'react';
import { Card,CardImg,CardBody,CardTitle,CardText,Breadcrumb,BreadcrumbItem,Button,Modal,ModalBody,ModalHeader,Row,Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { Fade,FadeTransform,Stagger } from 'react-animation-components';



     function RenderDish({dish}) {
         if (dish != null)
             return(
                 <div className="col-12 col-md-5 m-1">
                     <FadeTransform in transformProps={{ exitTransform:'scale(0.5) translateY(-50%)' }}>
                         <Card>
                             <CardImg top src={baseUrl + dish.image} alt={dish.name}/>
                             <CardBody>
                                 <CardTitle>{dish.name}</CardTitle>
                                 <CardText>{dish.description}</CardText>
                             </CardBody>
                         </Card>
                    </FadeTransform>
                 </div>
             );
         else
             return(
                 <div></div>
             );
    }


     function RenderComments({comments, postComment, dishId}){
        if(comments != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {comments.map((comm) => {
                                return(
                                    <Fade in>
                                        <li key={comm.id}>
                                            <p>{comm.comment}</p>
                                            <p>-- {comm.author} , {new Intl.DateTimeFormat('en-US', {year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comm.date))) }</p>
                                        </li>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }



    const  DishDetail = (props) => {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}    />
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }


    const minLength = (len) => (val) => (val) && (val.length >= len );
    const maxLength = (len) => (val) => !(val) || (val.length <= len );

    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state = {
                isCommentOpen:false
            }
            this.toggleComment = this.toggleComment.bind(this);
            this.handleComment = this.handleComment.bind(this);
        }

        toggleComment(){
            this.setState({
                isCommentOpen : !this.state.isCommentOpen
            });
        }

        handleComment(values){
            console.log("Current state: "+JSON.stringify(values));
            this.toggleComment();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }

         render() {
             return(
                 <>
                     <Button outline onClick={this.toggleComment}>
                         <span className="fa fa-pencil fa-lg"> Submit Comment</span>
                     </Button>
                     <Modal isOpen={this.state.isCommentOpen} toggle={this.toggleComment}>
                         <ModalHeader toggle={this.toggleComment}>Submit Comment</ModalHeader>
                         <ModalBody>
                             <LocalForm className="container" onSubmit={(values)=>this.handleComment(values)}>

                                 <Row className="form-group" md={12}>
                                     <Label htmlFor="rating">Rating</Label>
                                     <Control.select model=".rating" className="form-control" id="rating" name="rating">
                                         <option>1</option>
                                         <option>2</option>
                                         <option>3</option>
                                         <option>4</option>
                                         <option>5</option>
                                     </Control.select>
                                 </Row>
                                  <Row className="form-group" md={12}>
                                      <Label htmlFor="author">Your Name</Label>
                                      <Control.text model=".author" id="author" name="author" className="form-control" placeholder="Your Name"validators={{ minLength:minLength(3),maxLength:maxLength(15) }} />
                                      <Errors className="text-danger" model=".author" show="touched" messages={{
                                              minLength:'At least 3 characters',
                                              maxLength:'Must be 15 characters or less'
                                          }} />
                                  </Row>
                                  <Row className="form-group" md={12}>
                                      <Label htmlFor="comment"> Comment</Label>
                                      <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"/>
                                  </Row>
                                  <Row className="form-group" md={12}>
                                      <Button type="submit" color="primary">Submit</Button>
                                  </Row>
                             </LocalForm>
                         </ModalBody>
                     </Modal>
                 </>
                );
        }
    }



export default DishDetail;
