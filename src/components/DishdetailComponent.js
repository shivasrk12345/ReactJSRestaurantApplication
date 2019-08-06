import React, {Component} from 'react';
import { directive } from '@babel/types';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
class DishDetail  extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDish: null
        }
    }
    renderDish(dish) {
        if (dish != null)
            return(
                <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
        else
            return(
                <div></div>
            );
    }
    renderComments(comments) {
        if (comments == null) {
            return (
                <div></div>
                );
        }
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
                )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>

            </div>
        )
    }
    render(){
        const dish = this.props.dish;
        if(dish==null){
            return(<div></div>);
        }
        return(
            <div className="container">
                <div className="row">            
                    {this.renderDish(dish)}
                    {this.renderComments(dish.comments)}
                    
                </div>
            </div>
        );
    }
}

export default DishDetail;