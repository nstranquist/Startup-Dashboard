import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { firestore } from '../../utils/firebaseHelper'
import TableWrapper from './anttable.style';
import { Input, Button, Icon } from 'antd'

/* scholarship Item schema:
  1) name
  2) major(s)
  3) website
  4) amount
  5) requirements
  6) address
  7) contact
*/  

// use for multiple tables:
//const tableinfos = []

// TODO: cleaner data, parse majors into array and update the filter/search functions
class ScholarshipsList extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      scholarships: [],
      // select rows
      selectedRowKeys: [],
      // filtering
      filteredInfo: null,
      // sorting
      sortedInfo: null,
      sortOption: {},
      sortKey: null,
      sortDir: null,
      // searching
      searchText: '',
    }
  }

  componentDidMount() {
    console.log('at schol mount')
    this.getScholarships()
  }

  // call firestore data with the sdk
  getScholarships() {
    firestore
    .collection('scholarships')
    .limit(20)
    .get()
    .then(snap => {
      let newScholarships = []
      snap.docs.map((scholarship) => {
        const newItem = {
          id: scholarship.id,
          name: scholarship.data().name,
          majors: scholarship.data().majors,
          amount: scholarship.data().awardAmount,
          website: scholarship.data().website,
        }
        newScholarships.push(newItem)
      })
      return newScholarships
    })
    .then((newScholarships) => {
      console.log('new schols:', newScholarships)
      this.setState({
        scholarships: newScholarships
      }, console.log(this.state.scholarships))
    })
    .catch(err => console.log(err))
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setColumnSort = (keyName) => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: keyName,
      },
    });
  }  

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const sortColumns = [
      // want to search by name
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        // render: object => renderCell(object, 'TextCell', 'name'),
      },
      // want to sort by major
      // want to filter by major
      {
        title: 'Majors',
        dataIndex: 'majors',
        key: 'majors',
        width: 200,
        filters: [{ text: 'Nursing', value: 'Nursing'}, {text: 'Accounting', value:'Accounting'}],
        filteredValue: filteredInfo.majors || null,
        onFilter: (value, record) => record.majors.includes(value),
        // render: object => ,
        sorter: (a, b) => a.majors[0] > b.majors[0],
        sortOrder: sortedInfo.columnKey === 'majors' && sortedInfo.order,
        ellipsis: true,
      },
      // want to sort by amount
      // want to filter by amount (ranges)
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        width: 100,
        filters: [{ text: '<1000', value: '1000' }, { text: '1000-2000', value: '2000' }, { text: '2000-3000', value: '3000' },
          {text: '3000-4000', value: '4000'}, {text: '4000-5000', value:'5000'}, {text: '>5000', value: '100000' }],
        filteredValue: filteredInfo.amount || null,
        onFilter: (value, record) => record.amount.includes(value), // could parse for '$'
        sorter: (a, b) => a.amount.length - b.amount.length,
        sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
        width: 100,
        render: item => <a href={item} target='_blank'>{item}</a>,
      }
    ];

    return (
      <div>
        <h1>Browse Scholarships</h1>
        <div className="table-operations">
          <Button onClick={() => this.setColumnSort('name')}>Sort Name</Button>
          <Button onClick={() => this.setColumnSort('majors')}>Sort Majors</Button>
          <Button onClick={() => this.setColumnSort('amount')}>Sort Amount</Button>
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
        <TableWrapper
          columns={sortColumns}
          onChange={this.handleChange}
          dataSource={this.state.scholarships}
          className="isoSortingTable"
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.myapp.profile,
  scholarships: state.myapp.scholarships,
})

export default connect(
  mapStateToProps,
  {  }
)(ScholarshipsList)


// OLD CODE:
// npm react-highlight-words  <-- cool package! use with search table
// dataModel(index) {
  //   return tableData[index];
  // }
  // getObjectAt(index) {
  //   if (index < 0 || index > this.size) {
  //     return undefined;
  //   }
  //   if (this.state.scholarships[index] === undefined) {
  //     this.state.scholarships[index] = this.dataModel(index);
  //   }
  //   return this.state.scholarships[index];
  // }
  // getAll() {
  //   if (this.state.scholarships.length < this.size) {
  //     for (let i = 0; i < this.size; i++) {
  //       this.getObjectAt(i);
  //     }
  //   }
  //   return this.state.scholarships.slice();
  // }

  // getSize() {
  //   return this.state.scholarships.length;
  // }
  // getSortAsc(sortKey) {
  //   this.setState({ 
  //     sortKey: sortKey,
  //     sortDir: 'ASC'
  //   }) // watch out for async errs
  //   return this.state.scholarships.sort(this.sort);
  // }
  // getSortDesc(sortKey) {
  //   this.setState({ 
  //     sortKey: sortKey,
  //     sortDir: 'DESC'
  //   })
  //   return this.state.scholarships.sort(this.sort);
  // }
  // sort(optionA, optionB) {
  //   const valueA = optionA[this.state.sortKey].toUpperCase();
  //   const valueB = optionB[this.state.sortKey].toUpperCase();
  //   let sortVal = 0;
  //   if (valueA > valueB) {
  //     sortVal = 1;
  //   }
  //   if (valueA < valueB) {
  //     sortVal = -1;
  //   }
  //   if (sortVal !== 0 && this.state.sortDir === 'DESC') {
  //     return sortVal * (-1);
  //   }
  //   return sortVal;
  // }

// code to search table:
/*
getColumnSearchProps = dataIndex => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={node => {
          this.searchInput = node;
        }}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type="primary"
        onClick={() => this.handleSearch(selectedKeys, confirm)}
        icon="search"
        size="small"
        style={{ width: 90, marginRight: 8 }}
      >
        Search
      </Button>
      <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
        Reset
      </Button>
    </div>
  ),
  filterIcon: filtered => (
    <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: visible => {
    if (visible) {
      setTimeout(() => this.searchInput.select());
    }
  },
  render: text => (
    <Highlighter
      highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      searchWords={[this.state.searchText]}
      autoEscape
      textToHighlight={text.toString()}
    />
  ),
});
*/