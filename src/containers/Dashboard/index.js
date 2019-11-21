import React, { Component } from 'react';
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import basicStyle from '../../settings/basicStyle';
import IsoWidgetsWrapper from './widgets-wrapper';
import IsoWidgetBox from './widget-box';
import CardWidget from './card/card-widgets';
import ReportsWidget from './report/report-widget';
import { TableViews } from '../Tables/antTables';
import { tableinfos } from './config/tableconfigs';
import BookingAreaChart from '../Charts/recharts/charts/bookingAreaChart';
import ProjectedRentBarChart from '../Charts/recharts/charts/projectedRentBarChart';
import IntlMessages from '../../components/utility/intlMessages';
import PricingLineChart from "../Charts/recharts/charts/pricingLineChart";
import propertiesActions from "../../redux/properties/actions";
import PropertyMap from "../Map/GoogleMap/maps/propertyMap";
import { Card } from 'antd';
import { getUserData } from '../../redux/_store/profileContainer/userData/actions'
import { getScholarships } from '../../redux/_store/scholarships/actions'
import TabList from './TabList'
import Spin from '../Feedback/Spin/spin.style';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserData()
    this.props.getScholarships()
  }

  //componentWillReceiveProps(nextProps) {
    // if(this.props.user !== nextProps.user) {
      // if(nextProps.user && !nextProps.user.settings.selected_plan){
      //   this.props.history.push("/dashboard/settings?s=plan&n=true");
      //   console.log("no plan");
      // } else if (nextProps.user && nextProps.user.settings.monthly_amount > 0 && !nextProps.user.settings.stripe_subscription_id) {
      //   this.props.history.push("/dashboard/settings?s=billing&n=true");
      //   console.log("no card");
      // } else if (nextProps.user && !nextProps.user.property_id) {
      //   this.props.history.push("/dashboard/settings?s=property&n=true");
      //   console.log("no property");
      // }
    // }

    // if(this.props.user && nextProps.user && this.props.user.current_property !== nextProps.user.current_property){
    //   this.loadCompetition();
    //   this.loadBooking();
    //   this.loadPricing();
    //   this.loadProjectedRent();
    //   this.loadMarketStats();
    // }
  //}

  // loadCompetition = () => {
  //   const { getCompetition } = this.props;
  //   getCompetition({limit: 5});
  // };
  // loadBooking = () => {
  //   const { getMarketBooking } = this.props;
  //   getMarketBooking();
  // };
  // loadPricing = () => {
  //   const { getMarketPricing } = this.props;
  //   getMarketPricing();
  // };
  // loadProjectedRent = () => {
  //   const { getProjectedRent } = this.props;
  //   getProjectedRent();
  // };
  // loadMarketStats = () => {
  //   const { getMarketStats } = this.props;
  //   getMarketStats();
  // };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const wisgetPageStyle = {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      overflow: 'hidden',
    };

    const {
      competition,
      bookings,
      pricing,
      projectedRent,
      marketStats
    } = this.props;

    const bookingConfig = {
      colors: ['#BAA6CA', '#B7DCFA', '#FFE69A', '#788195'],
      width: window.innerWidth < 450 ? 300 : window.innerWidth,
      height: 350,
      datas: bookings
    };
    const rentConfig = {
      colors: ['#BAA6CA', '#B7DCFA', '#FFE69A', '#788195'],
      width: window.innerWidth < 450 ? 300 : 500,
      height: 350,
      datas: projectedRent
    };
    const pricingConfig = {
      width: window.innerWidth < 450 ? 300 : 500,
      height: 350,
      datas: pricing
    };
    return (
      // <LayoutWrapper>
        <div style={{padding: '30px', textAlign:'center'}}>
          <Row gutter={24} span={24} style={{marginBottom: '30px !important'}}>
            <Col md={24} lg={8} >
              <Card title="Matches" bordered={false}>
                <span style={{color:'green', fontSize:'30px'}}>5</span>
              </Card>
            </Col>
            <Col md={24} lg={8}>
              <Card title="All Scholarships" bordered={false}>
              <span style={{fontSize:'30px'}}>250</span>
              </Card>
            </Col>
            <Col md={24} lg={8}>
              <Card title="Applications" bordered={false}>
              <span style={{color:'blue', fontSize:'30px'}}>3</span>
              </Card>
            </Col>
          </Row>
          <Row><Col span={24} style={{fontSize: '30px', textAlign: 'center', marginTop: '30px', marginBottom: '15px'}}>Summary</Col></Row>
          <Row gutter={24} style={{margin: '30px', marginTop: '30px'}}>
            <Col span={24} >
              <Card>
                <Card type="inner" title="Matches" extra={<a href="#">More</a>}>
                  {this.props.scholarships.map(item => {
                    <div>item.name</div>
                  })}
                  No matches yet
                </Card>
                <Card
                  style={{ marginTop: 16 }}
                  type="inner"
                  title="Scholarships"
                  extra={<a href="#">More</a>}
                >
                  No sved scholarships yet
                </Card>
                <Card
                  style={{ marginTop: 16 }}
                  type="inner"
                  title="Applications"
                  extra={<a href="#">More</a>}
                >
                  No applications started yet
                </Card>
              </Card>
            </Col>
          </Row>
         
        </div>
      // </LayoutWrapper>
    );
  }
}

export default connect(
  state => ({
    scholarships: state.myapp.scholarships.scholarships,
    user: state.myapp.profile.auth
  }),
  {getUserData, getScholarships}
  //{ getCompetition, getMarketBooking, getMarketPricing, getProjectedRent, getMarketStats }
)(Dashboard);
