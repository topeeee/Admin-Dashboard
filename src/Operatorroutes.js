import React from 'react';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const OperatorDashboard = React.lazy(() => import('./views/Dashboard/OperatorDashboard'));
const Area = React.lazy(() => import('./views/Setup/Area'));
const ActiveUsers = React.lazy(() => import('./views/Users/ActiveUsers'));
const InactiveUsers = React.lazy(() => import('./views/Users/InactiveUsers'));
const Drivers = React.lazy(() => import('./views/Drivers/Drivers'));
const Driver = React.lazy(() => import('./views/Drivers/Driver'));
const InactiveBusAssistants = React.lazy(() => import('./views/BusAssistants/InactiveBusAssistants'));
const ActiveBusAssistants = React.lazy(() => import('./views/BusAssistants/ActiveBusAssistants'));
const BusAssistants = React.lazy(() => import('./views/BusAssistants/BusAssistants'));
const BusAssistant = React.lazy(() => import('./views/BusAssistants/BusAssistant'));
const PendingBusAssistant = React.lazy(() => import('./views/BusAssistants/PendingBusAssistants'));
const Trips = React.lazy(() => import('./views/Trips/Trips'));
const TripsOverView = React.lazy(() => import('./views/Trips/TripsOverView'));
const CancelledTrips = React.lazy(() => import('./views/Trips/CancelledTrips'));
const TransitTrips = React.lazy(() => import('./views/Trips/TransitTrips'));
const CompletedTrips = React.lazy(() => import('./views/Trips/CompletedTrips'));
const WaitingTrips = React.lazy(() => import('./views/Trips/WaitingTrips'));
const Trip = React.lazy(() => import('./views/Trips/Trip'));
const Payments = React.lazy(() => import('./views/Payments/Payments'));
const SuccessfulPayments = React.lazy(() => import('./views/Payments/SuccessfulPayments'));
const UnsuccessfulPayments = React.lazy(() => import('./views/Payments/UnsuccessfulPayments'));
const RefundPayments = React.lazy(() => import('./views/Payments/Refunds'));
const PendingRefunds = React.lazy(() => import('./views/Payments/PendingRefunds'));
const CompletedRefunds = React.lazy(() => import('./views/Payments/CompletedRefunds'));
const Promo = React.lazy(() => import('./views/Payments/Promo'));
const DriverRatings = React.lazy(() => import('./views/Ratings/DriverRatings'));
const BusRatings = React.lazy(() => import('./views/Ratings/BusRatings'));
const Mode = React.lazy(() => import('./views/Mode/Mode'));
const States = React.lazy(() => import('./views/Setup/State'));
const Zones = React.lazy(() => import('./views/Setup/Zone'));
const Routes = React.lazy(() => import('./views/Setup/Routes'));
const BusStops = React.lazy(() => import('./views/Setup/BusStop'));
const Bookings = React.lazy(() => import('./views/Bookings/Bookings'));
const Vehicles = React.lazy(() => import('./views/Vehicle/Vehicles'));
const DriverLoggings =  React.lazy(() => import('./views/Drivers/DriverLoggings'));
const DriverRoutes = React.lazy(() => import('./views/Drivers/DriverRoutes'));
const Operators =  React.lazy(() => import('./views/Setup/operator/Operators'));
const ActiveOperators =  React.lazy(() => import('./views/Setup/operator/ActiveOperator'));
const InactiveOperators =  React.lazy(() => import('./views/Setup/operator/InactiveOperator'));
const ActiveDrivers = React.lazy(() => import('./views/Drivers/ActiveDrivers'));
const InactiveDrivers = React.lazy(() => import('./views/Drivers/InactiveDrivers'));
const PendingDrivers = React.lazy(() => import('./views/Drivers/PendingDrivers'));
const Operator =  React.lazy(() => import('./views/Setup/operator/Operator'));
const ActiveVehicles = React.lazy(() => import('./views/Vehicle/ActiveVehicles'));
const InactiveVehicles = React.lazy(() => import('./views/Vehicle/InactiveVehicles'));
const PendingVehicles = React.lazy(() => import('./views/Vehicle/PendingVehicles'));
const Vehicle = React.lazy(() => import('./views/Vehicle/Vehicle'));
const UsersOverview =  React.lazy(() => import('./views/Users/UsersOverView'));







// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/operator/dashboard', name: 'Dashboard', component: OperatorDashboard },
  { path: '/operator/drivers/active', exact: true, name: 'Active Drivers', component: ActiveDrivers},
  { path: '/operator/drivers/inactive', exact: true, name: 'Inactive Drivers', component: InactiveDrivers},
  { path: '/operator/drivers/pending', exact: true, name: 'Pending Drivers', component: PendingDrivers },
  { path: '/operator/areas', name: 'Areas', component: Area },
  { path: '/operator/modes', name: 'Mode', component: Mode },
  // { path: '/operators/active', name: 'Active Operators', component: ActiveOperators },
  // { path: '/operators/inactive', name: 'Inactive Operators', component: InactiveOperators },
  // { path: '/operators/:id', exact: true, name: 'Operator Details', component: Operator },
  // { path: '/operators', name: 'Operators', component: Operators },
  { path: '/operator/drivers/driverloggings', name: 'Driver Loggings', component: DriverLoggings },
  { path: '/operator/drivers/driverroutes', name: 'Driver Routes', component: DriverRoutes },
  { path: '/operator/bookings', name: 'Bookings', component: Bookings },
  { path: '/operator/vehicles/active', name: 'Active Vehicles', component: ActiveVehicles },
  { path: '/operator/vehicles/inactive', name: 'Inactive Vehicles', component: InactiveVehicles },
  { path: '/operator/vehicles/pending', name: 'Pending Vehicles', component: PendingVehicles },
  { path: '/operator/vehicles/:id', exact: true, name: 'Vehicle Details', component: Vehicle },
  { path: '/operator/vehicles', name: 'Vehicles', component: Vehicles },
  { path: '/operator/busstops', name: 'Bus Stops', component: BusStops },
  { path: '/operator/routes', name: 'Routes', component: Routes },
  { path: '/operator/states', name: 'States', component: States },
  { path: '/operator/zones', name: 'Zones', component: Zones },
  // { path: '/ratings/driver', name: 'Driver Ratings', component: DriverRatings },
  // { path: '/ratings/bus', name: 'Bus Ratings', component: BusRatings },
  // { path: '/payments/promo', name: 'Promo', component: Promo },
  // { path: '/payments/refunds/pending', name: 'Pending Refunds', component: PendingRefunds },
  // { path: '/payments/refunds/completed', name: 'Completed Refunds', component: CompletedRefunds },
  // { path: '/payments/successful', name: 'Successful Payments', component: SuccessfulPayments },
  // { path: '/payments/unsuccessful', name: 'Unsuccessful Payments', component: UnsuccessfulPayments },
  // { path: '/payments/refunds', name: 'Refunds', component: RefundPayments },
  // { path: '/payments', name: 'Payments', component: Payments },
  { path: '/operator/trips/cancelled', name: 'Cancelled Trips', component: CancelledTrips },
  { path: '/operator/trips/overview', name: 'Trips Overview', component: TripsOverView },
  { path: '/operator/trips/transit', name: 'Transit Trips', component: TransitTrips },
  { path: '/operator/trips/completed', name: 'Completed Trips', component: CompletedTrips },
  { path: '/operator/trips/waiting', name: 'Waiting Trips', component: WaitingTrips },
  { path: '/operator/trips/:id', name: 'Trip Details', component: Trip },
  { path: '/operator/trips', name: 'Trips', component: Trips },
  { path: '/operator/busassisstants/active', exact: true, name: 'Active Bus Assistants', component: ActiveBusAssistants },
  { path: '/operator/busassisstants/inactive', exact: true, name: 'Inactive Bus Assistants', component: InactiveBusAssistants },
  { path: '/operator/busassisstants/pending', exact: true, name: 'Pending Bus Assistants', component: PendingBusAssistant },
  { path: '/operator/busassisstants', exact: true, name: 'Bus Assistants', component: BusAssistants },
  { path: '/operator/busassisstants/:id', exact: true, name: 'Bus Assistant Details', component: BusAssistant },
  { path: '/operator/drivers/:id', name: 'Driver Details', component: Driver },
  { path: '/operator/drivers', exact: true, name: 'Drivers', component: Drivers },
  { path: '/operator/passengers/active', name: 'Active Passengers', component: ActiveUsers },
  { path: '/operator/passengers/overview', name: 'Passengers Overview', component: UsersOverview },
  { path: '/operator/passengers/inactive', name: 'Inactive Passengers', component: InactiveUsers },
  // { path: '/theme', exact: true, name: 'Theme', component: Colors },
  // { path: '/theme/colors', name: 'Colors', component: Colors },
  // { path: '/theme/typography', name: 'Typography', component: Typography },
  // { path: '/base', exact: true, name: 'Base', component: Cards },
  // { path: '/base/cards', name: 'Cards', component: Cards },
  // { path: '/base/forms', name: 'Forms', component: Forms },
  // { path: '/base/switches', name: 'Switches', component: Switches },
  // { path: '/base/tables', name: 'Tables', component: Tables },
  // { path: '/base/tabs', name: 'Tabs', component: Tabs },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  // { path: '/base/carousels', name: 'Carousel', component: Carousels },
  // { path: '/base/collapses', name: 'Collapse', component: Collapses },
  // { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  // { path: '/base/navbars', name: 'Navbars', component: Navbars },
  // { path: '/base/navs', name: 'Navs', component: Navs },
  // { path: '/base/paginations', name: 'Paginations', component: Paginations },
  // { path: '/base/popovers', name: 'Popovers', component: Popovers },
  // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  // { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  // { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', component: Flags },
  // { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  // { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  // { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', name: 'Badges', component: Badges },
  // { path: '/notifications/modals', name: 'Modals', component: Modals },
  // { path: '/widgets', name: 'Widgets', component: Widgets },
  // { path: '/charts', name: 'Charts', component: Charts },
  { path: '/operator/passengers/:id', exact: true, name: 'Passenger Details', component: User },
  { path: '/operator/passengers', exact: true,  name: 'Passengers', component: Users },

];

export default routes;