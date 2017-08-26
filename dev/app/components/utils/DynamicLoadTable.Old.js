import React, { Component } from 'react'
import { Table, Loader } from 'semantic-ui-react'
import {debounce} from '../../utils'

const INITIAL_STATE = {offsetItemsPaging:0, pageSize:3, moreItemToLoad:false, isLoadingItems:false, items:[]};

class DynamicLoadTable extends Component {
  constructor(props) {
     super(props);
     this.state = INITIAL_STATE;

     this.debouncedHandleScroll = debounce(::this.handleScroll, 300);
   }

   componentDidMount(){
     ::this.fetchData();
   }

   fetchData(){
     this.setState({isLoadingItems:true});
     const { offsetItemsPaging, pageSize } = this.state;

     this.props.fetchingMedthod(this.props.username, pageSize, offsetItemsPaging)
       .then(res => {

         const numberOfNewItems = res.data.length;
         const updatedItems = [...this.state.items, ...res.data];
         const newOffsetItemsPaging = this.state.offsetItemsPaging + numberOfNewItems;

         let moreItemToLoad = true;
         if (res.data.length < pageSize){
           moreItemToLoad = false;
         }

         this.setState({items:updatedItems,
                         offsetItemsPaging:newOffsetItemsPaging,
                         moreItemToLoad:moreItemToLoad,
                         isLoadingItems:false});
       })
       .catch(err => {
         console.log(err);
       });
   }

  handleScroll(target) {
    if (this.state.moreItemToLoad ){
      if (target.scrollTop + target.clientHeight >= target.scrollHeight ) {
        this.fetchData.call(this);
      }
    }
  }

   render(){
     const { className, headerRow, renderBodyRow } = this.props
     return  <div className={className} onScroll={(e) => this.debouncedHandleScroll(e.target)}>
               <Table celled unstackable style={{margin:'0'}}
                 headerRow={headerRow}
                 renderBodyRow={renderBodyRow}
                 tableData={this.state.items}/>

               <Loader style={{ position:'relative', height:'30px', top:'20px', left:'50%'}}
                       size="tiny" active={this.state.moreItemToLoad}/>
             </div>
   }

   componentWillReceiveProps(nextProps, nextState){
    if (this.props.username != nextProps.username){
      this.setState(INITIAL_STATE);
    }
   }

   componentDidUpdate(prevProps, prevState){
     if (this.props.username != prevProps.username){
       ::this.fetchData();
     }
   }
}

export default DynamicLoadTable
