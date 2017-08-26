import React, { Component } from 'react'
import { Table, Loader } from 'semantic-ui-react'
import {debounce} from '../../utils'

class DynamicLoadTable extends Component {
  constructor(props) {
     super(props);
     this.debouncedHandleScroll = debounce(::this.handleScroll, 300);
   }

  handleScroll(target) {
    if (this.props.moreItemToLoad ){
      if (target.scrollTop + target.clientHeight >= target.scrollHeight ) {
        this.props.fetchingMedthod();
      }
    }
  }

   render(){
     const { className, headerRow, renderBodyRow, tableData } = this.props
     return  <div className={className} onScroll={(e) => this.debouncedHandleScroll(e.target)}>
               <Table celled unstackable style={{margin:'0'}}
                 headerRow={headerRow}
                 renderBodyRow={renderBodyRow}
                 tableData={tableData}/>
               <Loader style={{ position:'relative', height:'30px', top:'20px', left:'50%'}}
                       size="tiny" active={this.props.moreItemToLoad}/>
             </div>
   }
}

export default DynamicLoadTable
