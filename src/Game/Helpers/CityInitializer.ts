import { Color } from "../../Enums/Color";
import { City } from "../City";

export class CityInitializer {
  public createLayout(): City[] {
    let cities: City[] = [];

    // Blue
    const atlanta = new City("Atlanta", Color.Blue, [-84.39, 33.75]);
    cities.push(atlanta);
    const chicago = new City("Chicago", Color.Blue, [-87.62, 41.87]);
    cities.push(chicago);
    const montreal = new City("Montreal", Color.Blue, [-73.57, 45.5]);
    cities.push(montreal);
    const newYork = new City("New York", Color.Blue, [-73.93, 40.73]);
    cities.push(newYork);
    const sanFrancisco = new City(
      "San Francisco",
      Color.Blue,
      [-122.42, 37.77],
    );
    cities.push(sanFrancisco);
    const washington = new City("Washington", Color.Blue, [-77.04, 38.91]);
    cities.push(washington);

    const london = new City("London", Color.Blue, [-0.12, 51.5]);
    cities.push(london);
    const madrid = new City("Madrid", Color.Blue, [-3.67, 40.4]);
    cities.push(madrid);
    const paris = new City("Paris", Color.Blue, [2.35, 48.85]);
    cities.push(paris);
    const essen = new City("Essen", Color.Blue, [7.07, 51.48]);
    cities.push(essen);
    const milan = new City("Milan", Color.Blue, [12.49, 45.46]);
    cities.push(milan);
    const stPetersburg = new City("St. Petersburg", Color.Blue, [30.31, 59.93]);
    cities.push(stPetersburg);

    // Yellow
    const losAngeles = new City("Los Angeles", Color.Yellow, [-118.24, 34.05]);
    cities.push(losAngeles);
    const mexicoCity = new City("Mexico City", Color.Yellow, [-99.13, 19.43]);
    cities.push(mexicoCity);
    const miami = new City("Miami", Color.Yellow, [-80.19, 25.76]);
    cities.push(miami);
    const bogota = new City("Bogota", Color.Yellow, [-74.08, 4.6]);
    cities.push(bogota);
    const lima = new City("Lima", Color.Yellow, [-77.03, -12.03]);
    cities.push(lima);
    const santiago = new City("Santiago", Color.Yellow, [-70.4, -33.45]);
    cities.push(santiago);
    const buenosAires = new City("Buenos Aires", Color.Yellow, [-58.38, -34.6]);
    cities.push(buenosAires);
    const saoPaulo = new City("Sao Paulo", Color.Yellow, [-46.63, -23.53]);
    cities.push(saoPaulo);
    const lagos = new City("Lagos", Color.Yellow, [3.39, 6.45]);
    cities.push(lagos);
    const khartoum = new City("Khartoum", Color.Yellow, [32.52, 15.3]);
    cities.push(khartoum);
    const kinshasa = new City("Kinshasa", Color.Yellow, [24.31, -4.4]);
    cities.push(kinshasa);
    const johannesburg = new City("Johannesburg", Color.Yellow, [28.04, -26.2]);
    cities.push(johannesburg);

    // Black
    const algiers = new City("Algiers", Color.Black, [3.05, 36.75]);
    cities.push(algiers);
    const cairo = new City("Cairo", Color.Black, [31.24, 30.04]);
    cities.push(cairo);
    const istanbul = new City("Istanbul", Color.Black, [28.97, 41.01]);
    cities.push(istanbul);
    const moscow = new City("Moscow", Color.Black, [37.62, 55.75]);
    cities.push(moscow);
    const tehran = new City("Tehran", Color.Black, [51.38, 35.71]);
    cities.push(tehran);
    const baghdad = new City("Baghdad", Color.Black, [44.36, 33.31]);
    cities.push(baghdad);
    const riyadh = new City("Riyadh", Color.Black, [46.63, 24.71]);
    cities.push(riyadh);
    const karachi = new City("Karachi", Color.Black, [67.08, 24.86]);
    cities.push(karachi);
    const mumbai = new City("Mumbai", Color.Black, [72.87, 19.07]);
    cities.push(mumbai);
    const delhi = new City("Delhi", Color.Black, [77.2, 28.61]);
    cities.push(delhi);
    const chennai = new City("Chennai", Color.Black, [80.27, 13.08]);
    cities.push(chennai);
    const kolkata = new City("Kolkata", Color.Black, [88.36, 22.57]);
    cities.push(kolkata);

    // Red
    const bangkok = new City("Bangkok", Color.Red, [100.52, 13.75]);
    cities.push(bangkok);
    const jakarta = new City("Jakarta", Color.Red, [106.82, -6.2]);
    cities.push(jakarta);
    const hoChiMinhCity = new City(
      "Ho Chi Minh City",
      Color.Red,
      [106.65, 10.82],
    );
    cities.push(hoChiMinhCity);
    const manila = new City("Manila", Color.Red, [120.98, 14.65]);
    cities.push(manila);
    const hongKong = new City("Hong Kong", Color.Red, [114.16, 22.32]);
    cities.push(hongKong);
    const shanghai = new City("Shanghai", Color.Red, [121.47, 31.23]);
    cities.push(shanghai);
    const beijing = new City("Beijing", Color.Red, [116.4, 39.9]);
    cities.push(beijing);
    const seoul = new City("Seoul", Color.Red, [126.97, 37.56]);
    cities.push(seoul);
    const tokyo = new City("Tokyo", Color.Red, [139.69, 35.68]);
    cities.push(tokyo);
    const osaka = new City("Osaka", Color.Red, [135.5, 34.69]);
    cities.push(osaka);
    const taipei = new City("Taipei", Color.Red, [121.5, 25.04]);
    cities.push(taipei);
    const sydney = new City("Sydney", Color.Red, [151.2, -33.87]);
    cities.push(sydney);

    // Blue
    atlanta.setConnections([chicago, washington, miami]);

    chicago.setConnections([
      sanFrancisco,
      losAngeles,
      mexicoCity,
      atlanta,
      montreal,
    ]);
    montreal.setConnections([chicago, washington, newYork]);
    newYork.setConnections([montreal, washington, london, madrid]);
    washington.setConnections([atlanta, newYork, montreal, miami]);
    sanFrancisco.setConnections([chicago, losAngeles, tokyo, manila]);

    london.setConnections([newYork, madrid, paris, essen]);
    madrid.setConnections([newYork, london, paris, saoPaulo, algiers]);
    paris.setConnections([london, madrid, essen, milan, algiers]);
    essen.setConnections([london, paris, milan, stPetersburg]);
    milan.setConnections([essen, paris, istanbul]);
    stPetersburg.setConnections([essen, istanbul, moscow]);

    // Yellow
    losAngeles.setConnections([sanFrancisco, chicago, mexicoCity, sydney]);
    mexicoCity.setConnections([losAngeles, chicago, miami, lima, bogota]);
    miami.setConnections([atlanta, washington, mexicoCity, bogota]);

    bogota.setConnections([mexicoCity, miami, lima, buenosAires, saoPaulo]);
    lima.setConnections([mexicoCity, bogota, santiago]);
    santiago.setConnections([lima]);
    buenosAires.setConnections([bogota, saoPaulo]);
    saoPaulo.setConnections([bogota, buenosAires, madrid, lagos]);

    lagos.setConnections([saoPaulo, kinshasa, khartoum]);
    kinshasa.setConnections([lagos, khartoum, johannesburg]);
    khartoum.setConnections([lagos, kinshasa, johannesburg, cairo]);
    johannesburg.setConnections([kinshasa, khartoum]);

    // Black
    algiers.setConnections([madrid, paris, istanbul, cairo]);
    cairo.setConnections([algiers, istanbul, baghdad, riyadh, khartoum]);
    istanbul.setConnections([
      milan,
      stPetersburg,
      moscow,
      baghdad,
      cairo,
      algiers,
    ]);
    moscow.setConnections([stPetersburg, istanbul, tehran]);

    tehran.setConnections([moscow, baghdad, karachi, delhi]);
    baghdad.setConnections([istanbul, cairo, riyadh, karachi, tehran]);
    riyadh.setConnections([cairo, baghdad, karachi]);

    karachi.setConnections([riyadh, baghdad, tehran, delhi, mumbai]);
    mumbai.setConnections([karachi, delhi, chennai]);
    delhi.setConnections([tehran, karachi, mumbai, chennai, kolkata]);
    chennai.setConnections([mumbai, delhi, kolkata, bangkok, jakarta]);
    kolkata.setConnections([delhi, chennai, bangkok, hongKong]);

    // Red
    bangkok.setConnections([
      chennai,
      kolkata,
      hongKong,
      hoChiMinhCity,
      jakarta,
    ]);
    jakarta.setConnections([chennai, bangkok, hoChiMinhCity, sydney]);
    hoChiMinhCity.setConnections([bangkok, jakarta, manila, hongKong]);
    manila.setConnections([hoChiMinhCity, hongKong, taipei, sanFrancisco]);
    hongKong.setConnections([
      bangkok,
      kolkata,
      hoChiMinhCity,
      manila,
      taipei,
      shanghai,
    ]);
    shanghai.setConnections([hongKong, beijing, seoul, tokyo]);
    beijing.setConnections([shanghai, seoul]);
    seoul.setConnections([beijing, shanghai, tokyo]);
    tokyo.setConnections([seoul, shanghai, osaka, sanFrancisco]);
    osaka.setConnections([tokyo, taipei]);
    taipei.setConnections([osaka, hongKong, manila]);
    sydney.setConnections([jakarta, manila, losAngeles]);

    return cities;
  }
}
