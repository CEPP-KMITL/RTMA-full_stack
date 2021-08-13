import { AnyCnameRecord } from 'dns';
import { RequestHandler } from 'express';
import { Incident } from '../models/incidentModel';

function ObjectLength(object: Array<object>) {
  var length = 0;
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      ++length;
    }
  }
  return length;
}

function heapify(count_province : number[],province_name: string[] ,n : number, i : number)
    {
        var largest = i; 
        var l = 2 * i + 1;
        var r = 2 * i + 2; 
        if (l < n && count_province[l] > count_province[largest])
            largest = l;

        if (r < n && count_province[r] > count_province[largest])
            largest = r;
        if (largest != i) {
            var swap = count_province[i];
            var swap2 = province_name[i];
            province_name[i] = province_name[largest];
            count_province[i] = count_province[largest];
            count_province[largest] = swap;
            province_name[largest] = swap2;
            heapify(count_province,province_name,n, largest);
        }
    }


export const createIncident: RequestHandler = async (req, res, next) => {
  var date = new Date()
  var temp = new Date() 
  var check = true
  temp.setHours(temp.getHours()-1)
  const allIncidents = await Incident.find().where('date').gt(temp.toISOString());
  for (var i in allIncidents) {
    var R = 6371; // Radius of the earth in km
    var dLat = (allIncidents[i].latitude-req.body.latitude)* (Math.PI/180);  // deg2rad below
    var dLon = (allIncidents[i].longitude-req.body.longitude)* (Math.PI/180); 
    var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(req.body.latitude* (Math.PI/180)) * Math.cos(allIncidents[i].latitude* (Math.PI/180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    if (d<0.4){
      check = false
    }
  }
  if (check == true){
    try {
      const newIncident = await Incident.create({...req.body,date});
      res.status(201).json({
        message: 'Create incident successfully.',
        createdIncident: newIncident,
      });
    } catch (e) {
      res.status(400).json({
        message: 'Fail to create incident' + ' : ' + e,
      });
    }
  }
  else {
    res.status(400).json({
      message: 'Fail to create incident' + ' :  location duplicate information' 
    });
  }
  
};

export const getAllIncidents: RequestHandler = async (req, res, next) => {
  try {
    const allIncidents = await Incident.find();
    res.status(201).json({
      message: 'Get all current incidents successfully.',
      results: ObjectLength(allIncidents),
      getIncidents: allIncidents,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to get all current incidents ' + ' : ' + e,
    });
  }
};

export const getfiveprovince: RequestHandler = async (req, res, next) => {
  try {
    let  province_counter = [{"province":"จ.กรุงเทพมหานคร"}, {"province":"จ.กระบี่"}, {"province":"จ.กาญจนบุรี"}, {"province":"จ.กาฬสินธุ์"}, {"province":"จ.กำแพงเพชร"},
    {"province":"จ.ขอนแก่น"}, {"province":"จ.จันทบุรี"}, {"province":"จ.ฉะเชิงเทรา"}, {"province":"จ.ชลบุรี"}, {"province":"จ.ชัยนาท"},
    {"province":"จ.ชัยภูมิ"}, {"province":"จ.ชุมพร"}, {"province":"จ.เชียงราย"}, {"province":"จ.เชียงใหม่"}, {"province":"จ.ตรัง"},
    {"province":"จ.ตราด"}, {"province":"จ.ตาก"}, {"province":"จ.นครนายก"}, {"province":"จ.นครปฐม"}, {"province":"จ.นครพนม"},
    {"province":"จ.นครราชสีมา"}, {"province":"จ.นครศรีธรรมราช"}, {"province":"จ.นครสวรรค์"}, {"province":"จ.นนทบุรี"}, {"province":"จ.นราธิวาส"},
    {"province":"จ.น่าน"}, {"province":"จ.บึงกาฬ"}, {"province":"จ.บุรีรัมย์"}, {"province":"จ.ปทุมธานี"}, {"province":"จ.ประจวบคีรีขันธ์"},
    {"province":"จ.ปราจีนบุรี"}, {"province":"จ.ปัตตานี"}, {"province":"จ.พระนครศรีอยุธยา"}, {"province":"จ.พังงา"}, {"province":"จ.พัทลุง"},
    {"province":"จ.พิจิตร"}, {"province":"จ.พิษณุโลก"}, {"province":"จ.เพชรบุรี"}, {"province":"จ.เพชรบูรณ์"}, {"province":"จ.แพร่"},
    {"province":"จ.พะเยา"}, {"province":"จ.ภูเก็ต"}, {"province":"จ.มหาสารคาม"}, {"province":"จ.มุกดาหาร"}, {"province":"จ.แม่ฮ่องสอน"}, 
    {"province":"จ.ยะลา"}, {"province":"จ.ยโสธร"}, {"province":"จ.ร้อยเอ็ด"}, {"province":"จ.ระนอง"}, {"province":"จ.ระยอง"},
    {"province":"จ.ราชบุรี"}, {"province":"จ.ลพบุรี"}, {"province":"จ.ลำปาง"}, {"province":"จ.ลำพูน"},{"province":"จ.เลย"},
    {"province":"จ.ศรีสะเกษ"}, {"province":"จ.สกลนคร"}, {"province":"จ.สงขลา"}, {"province":"จ.สตูล"}, {"province":"จ.สมุทรปราการ"},
    {"province":"จ.สมุทรสงคราม"}, {"province":"จ.สมุทรสาคร"}, {"province":"จ.สระแก้ว"}, {"province":"จ.สระบุรี"}, {"province":"จ.สิงห์บุรี"},
    {"province":"จ.สุโขทัย"}, {"province":"จ.สุพรรณบุรี"}, {"province":"จ.สุราษฎร์ธานี"}, {"province":"จ.สุรินทร์"}, {"province":"จ.หนองคาย"},
    {"province":"จ.หนองบัวลำภู"}, {"province":"จ.อ่างทอง"}, {"province":"จ.อุดรธานี"}, {"province":"จ.อุทัยธานี"}, {"province":"จ.อุตรดิตถ์"}, 
    {"province":"จ.อุบลราชธานี"}, {"province":"จ.อำนาจเจริญ"}];
    let count_province = [0,0,0,0,0,0,0,0,0,0,
                          0,0,0,0,0,0,0,0,0,0,
                          0,0,0,0,0,0,0,0,0,0,
                          0,0,0,0,0,0,0,0,0,0,
                          0,0,0,0,0,0,0,0,0,0,
                          0,0,0,0,0,0,0,0,0,0,
                          0,0,0,0,0,0,0,0,0,0,
                          0,0,0,0,0,0,0];
  
    let province_name = ["จ.กรุงเทพมหานคร", "จ.กระบี่", "จ.กาญจนบุรี", "จ.กาฬสินธุ์", "จ.กำแพงเพชร",
    "จ.ขอนแก่น", "จ.จันทบุรี", "จ.ฉะเชิงเทรา", "จ.ชลบุรี", "จ.ชัยนาท",
    "จ.ชัยภูมิ", "จ.ชุมพร", "จ.เชียงราย", "จ.เชียงใหม่", "จ.ตรัง",
    "จ.ตราด", "จ.ตาก", "จ.นครนายก", "จ.นครปฐม", "จ.นครพนม",
    "จ.นครราชสีมา", "จ.นครศรีธรรมราช", "จ.นครสวรรค์", "จ.นนทบุรี", "จ.นราธิวาส",
    "จ.น่าน", "จ.บึงกาฬ", "จ.บุรีรัมย์", "จ.ปทุมธานี", "จ.ประจวบคีรีขันธ์",
    "จ.ปราจีนบุรี", "จ.ปัตตานี", "จ.พระนครศรีอยุธยา", "จ.พังงา", "จ.พัทลุง",
    "จ.พิจิตร", "จ.พิษณุโลก", "จ.เพชรบุรี", "จ.เพชรบูรณ์", "จ.แพร่",
    "จ.พะเยา", "จ.ภูเก็ต", "จ.มหาสารคาม", "จ.มุกดาหาร", "จ.แม่ฮ่องสอน", 
    "จ.ยะลา", "จ.ยโสธร", "จ.ร้อยเอ็ด", "จ.ระนอง", "จ.ระยอง",
    "จ.ราชบุรี", "จ.ลพบุรี", "จ.ลำปาง", "จ.ลำพูน","จ.เลย",
    "จ.ศรีสะเกษ", "จ.สกลนคร", "จ.สงขลา", "จ.สตูล", "จ.สมุทรปราการ",
    "จ.สมุทรสงคราม", "จ.สมุทรสาคร", "จ.สระแก้ว", "จ.สระบุรี", "จ.สิงห์บุรี",
    "จ.สุโขทัย", "จ.สุพรรณบุรี", "จ.สุราษฎร์ธานี", "จ.สุรินทร์", "จ.หนองคาย",
    "จ.หนองบัวลำภู", "จ.อ่างทอง", "จ.อุดรธานี", "จ.อุทัยธานี", "จ.อุตรดิตถ์", 
    "จ.อุบลราชธานี", "จ.อำนาจเจริญ"];
    let top5 : string[][] = [[],[],[],[],[]];
    for(var i = 0; i < province_counter.length; i++){
      const addcount = await Incident.where( province_counter[i] ).count();
      count_province[i] += addcount;
    }
    const count = Array.from(new Set(count_province)).sort().reverse();
    for (let i = 0; i < province_name.length ; i++) {
      for(let j = 0; j < count.length; j++){
        if(j >= 5) {break}
        if(count_province[i] == count[j] && count_province[i] != 0){
          top5[j].push(province_name[i]);
          
        }
      }
    }
    let gettop = {
      "st1" : top5[0],
      "nd2" : top5[1],
      "rd3" : top5[2],
      "th4" : top5[3],
      "th5" : top5[4]
    }
    console.log(count)
    res.status(201).json({
      message: 'Get all current incidents successfully.',
      getIncidents: gettop,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to get all current incidents ' + ' : ' + e,
    });
  }
  
};

export const getonedayincident: RequestHandler = async (req, res, next) => {
  var temp = new Date() 
  temp.setDate(temp.getDate()-1)

  try {
    const allIncidents = await Incident.find().where('date').gt(temp.toISOString());
    res.status(201).json({
      message: 'Get all current incidents successfully.',
      results: ObjectLength(allIncidents),
      getIncidents: allIncidents,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to get all current incidents ' + ' : ' + e,
    });
  }
};

export const get8hoursincident: RequestHandler = async (req, res, next) => {
  var temp = new Date() 
  temp.setHours(temp.getHours()-8)

  try {
    const allIncidents = await Incident.find().where('date').gt(temp.toISOString());
    res.status(201).json({
      message: 'Get all current incidents successfully.',
      results: ObjectLength(allIncidents),
      getIncidents: allIncidents,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to get all current incidents ' + ' : ' + e,
    });
  }
};

export const getIncident: RequestHandler = async (req, res, next) => {
  try {
    const targetIncident = await Incident.findById(req.params.id);
    res.status(201).json({
      message: 'Get the incidents successfully.',
      getIncident: targetIncident,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to get the incidents' + ' : ' + e,
    });
  }
};

export const updateIncident: RequestHandler = async (req, res, next) => {
  try {
    const targetIncident = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(201).json({
      message: 'Update the incident successfully.',
      updateTarget: targetIncident,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to update the incident' + ' : ' + e,
    });
  }
};

export const deleteIncident: RequestHandler = async (req, res, next) => {
  try {
    const targetIncident = await Incident.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: 'Delete the incident successfully.',
      deleteTarget: targetIncident,
    });
  } catch (e) {
    res.status(400).json({
      message: 'Fail to delete the incident' + ' : ' + e,
    });
  }
};


