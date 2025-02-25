const axios = require("axios");
const JSSoup = require("jssoup").default;

let newsObj = {};

const filterNews = (news) => {
  const reg = /Who|What|How|Here|This|These|Watch|quiz|\?$|\.{3,6}/;
  if (!reg.test(news)) return true;
  else false;
};

const engadget = async () => {
  let news = [];
  try {
    const response = await axios.get("https://www.engadget.com/");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headingBlock = soup.find("div", { id: "module-latest" });
    let headings = headingBlock.findAll("h2");
    for (let heading of headings) {
      heading = heading.text;
      if (filterNews(heading)) news.push(heading);
    }
  } catch {
    if (news.length == 0) news.push("None");
  }
  newsObj["engadget"] = news;
};

const gadgets_ndtv = async () => {
  let news = [];
  try {
    const response = await axios.get("https://gadgets.ndtv.com/news");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("span", "news_listing");

    for (let heading of headings) {
      heading = heading.text;
      if (filterNews(heading)) news.push(heading);
    }
  } catch {
    if (news.length == 0) news.push("None");
  }
  newsObj["gadgets-ndtv"] = news;
};

const gadgets_now = async () => {
  let news = [];
  try {
    const response = await axios.get("https://www.gadgetsnow.com/tech-news");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headingBlock = soup.find("div", "tech_list"); //getting global div which is holding all news heading

    let headings = headingBlock.findAll("span", "w_tle");

    for (let heading of headings) {
      heading = heading.text;
      if (filterNews(heading)) news.push(heading);
    }
  } catch {
    if (news.length == 0) news.push("None");
  }
  newsObj["gadgets-now"] = news;
};

const inshorts = async () => {
  let news = [];
  try {
    const response = await axios.get("https://inshorts.com/en/read/technology");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("div", "news-card-title");

    for (let heading of headings) {
      heading = heading.find("span").text; //get text of the span element
      if (filterNews(heading)) news.push(heading);
    }
  } catch {
    if (news.length == 0) news.push("None");
  }
  newsObj["inshorts"] = news;
};

const techcrunch = async () => {
  let news = [];
  try {
    const response = await axios.get("https://techcrunch.com/");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("h2", "post-block__title");

    for (let heading of headings) {
      heading = heading.text;
      heading = heading.replace(/\t|\n/g, ""); //remove \t and \n
      if (filterNews(heading)) news.push(heading);
    }
  } catch {
    if (news.length == 0) news.push("None");
  }
  newsObj["techcrunch"] = news;
};

const xda_developers = async () => {
  let news = [];
  try {
    const response = await axios.get(
      "https://www.xda-developers.com/category/xda-news/"
    );
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("div", "item_content");

    for (let heading of headings) {
      heading = heading.find("h4").text;
      if (filterNews(heading)) news.push(heading);
    }
  } catch {
    if (news.length == 0) news.push("None");
  }
  newsObj["xda-developers"] = news;
};

const mobile_reuters = async () => {
  let news = [];
  try {
    const response = await axios.get("https://mobile.reuters.com/technology");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("h3", "article-heading");

    for (let heading of headings) {
      heading = heading.text;
      if (filterNews(heading)) news.push(heading);
    }
  } catch {
    if (news.length == 0) news.push("None");
  }
  newsObj["mobile-reuters"] = news;
};

const india = async () => {
  let news = [];
  try {
    const response = await axios.get("https://www.india.com/technology/");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("h3");

    for (let heading of headings) {
      heading = heading.text;
      heading = heading.replace(/\s{2,6}/g, "'"); //remove multiple spaces
      if (filterNews(heading)) news.push(heading);
    }
  } catch {
    if (news.length == 0) news.push("None");
  }
  newsObj["india"] = news;
};

const beebom = async () => {
  let news = [];
  try {
    const response = await axios.get("https://beebom.com/category/news/");
    let htmlContent = response.data; //data field has html code
    //scraping..
    let soup = new JSSoup(htmlContent);
    let headings = soup.findAll("h3", "entry-title");

    for (let heading of headings) {
      heading = heading.text;
      if (filterNews(heading)) news.push(heading);
    }
  } catch {
    if (news.length == 0) news.push("None");
  }
  newsObj["beebom"] = news;
};

const about = async () => {
  newsObj["about"] = {
    info: "This is a unofficial news-api from different popular tech news websites.",
    "my-github": "https://github.com/Script-Kiddie-JKB",
    
  };
};

module.exports.getNews = async () => {
  console.log("GETTING NEWS!!!");
  const gNdtv = gadgets_ndtv();
  const gNow = gadgets_now();
  const inshts = inshorts();
  const crunch = techcrunch();
  const xda = xda_developers();
  const reuters = mobile_reuters();
  const info = about();
  const ind = india();
  const bee = beebom();
  const engad = engadget();

  await Promise.all([
    gNdtv,
    gNow,
    inshts,
    crunch,
    xda,
    reuters,
    info,
    ind,
    bee,
    engad,
  ]);
  return newsObj;
};
