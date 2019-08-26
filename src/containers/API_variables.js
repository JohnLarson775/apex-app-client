// extract trackers object
var trackers = this.state.all_data[this.state.active_legend].data
// extract active legend's stat keys
var stat_1_key = Object.keys(trackers)[0]
var stat_2_key = Object.keys(trackers)[1]
var stat_3_key = Object.keys(trackers)[2]
// populate empty trackers with first stat
var stat_2_key = (stat_2_key === undefined) ? stat_1_key : stat_2_key;
var stat_3_key = (stat_3_key === undefined) ? stat_1_key : stat_3_key;
// extract active legend's image
var leg_img = this.state.all_data[this.state.active_legend].ImgAssets.icon
// extract active legend's stat names
var stat_1_name = trackers[stat_1_key].name
var stat_2_name = trackers[stat_2_key].name
var stat_3_name = trackers[stat_3_key].name
// extract active legend's stat values
var stat_1 = trackers[stat_1_key].value
var stat_2 = trackers[stat_2_key].value
var stat_3 = trackers[stat_3_key].value