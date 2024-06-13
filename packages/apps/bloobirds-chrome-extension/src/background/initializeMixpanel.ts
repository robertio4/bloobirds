import mixpanel from 'mixpanel-browser';

if (process.env.NODE_ENV === 'production') {
  mixpanel.init('b2373343acb028c8d63ce064fadcada2');
} else {
  mixpanel.init('7700a68ac54ffa55064f2f2739a6a47e');
}
