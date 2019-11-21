// import React from 'react'
// import { connect } from 'react-redux'

// import { Card, List, Avatar, Button, Skeleton } from 'antd';

// const tabListNoTitle = [
//   {
//     key: 'scholarships',
//     tab: 'scholarships',
//   },
//   {
//     key: 'schools',
//     tab: 'schools',
//   },
//   {
//     key: 'applications',
//     tab: 'applications',
//   },
// ];

// //const contentListNoTitle = {
// //  article: <p>article content</p>,
// //  app: <p>app content</p>,
// //  project: <p>project content</p>,
// //};

// class TabsCard extends React.Component {
//   constructor(props) {
//     super(props)
//   }


//   state = {
//     key: 'tab1',
//     noTitleKey: 'app',
//   };

//   onTabChange = (key, type) => {
//     console.log(key, type);
//     this.setState({ [type]: key });
//   };

//   render() {
//     return (
//       <div>
//         <Card
//           style={{ width: '100%' }}
//           tabList={tabListNoTitle}
//           activeTabKey={this.state.noTitleKey}
//           tabBarExtraContent={<a href="#">More</a>}
//           onTabChange={key => {
//             this.onTabChange(key, 'noTitleKey');
//           }}
//         >
//           {this.props.loading ? (
//             <div>Loading content...</div>
//           ) : (
//             <List
//               className="demo-loadmore-list"
//               loading={initLoading}
//               itemLayout="horizontal"
//               loadMore={loadMore}
//               dataSource={this.props.content}
//               renderItem={item => (
//                 <List.Item
//                   actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
//                 >
//                   <Skeleton avatar title={false} loading={item.loading} active>
//                     <List.Item.Meta
//                       title={<Link href="https://edurain.org">{item.name.last}</Link>}
//                       description="Ant Design, a design language for background applications, is refined by Ant UED Team"
//                     />
//                     <div>content</div>
//                   </Skeleton>
//                 </List.Item>
//               )}
//             />
//           )}
         
//         </Card>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => ({
//   scholarships: state.myapp.scholarships.scholarships
// })

// export default connect(
//   mapStateToProps
// )(TabsCard)