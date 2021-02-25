# GK-Project4-Stadium

<b>Stadium</b> to aplikacja stworzona w ramach przedmiotu "Grafika komputerowa 1" na 5. semestrze studiów, która skupia się na zaprezentowaniu niektórych właściwości i funkcji grafiki 3D. Projekt został wykonany w języku JavaScript przy użyciu biblioteki three.js (https://threejs.org/) z rozszerzeniem WebGL.

## Uruchomienie

Aplikację można uruchomić przy użyciu lokalnego serwera wykorzystując NodeJS oraz komendę <i>http-server . -p 8000</i>. Otwarcie folderu plików aplikacji przy użyciu edytora kodu źródłowego (np. Visual Studio Code) i zastosowanie polecenia <i>npx browser-sync start -s ./ -w *</i> pozwoli na uruchomienie serwera i odświażenie strony po zapisaniu każdej zmiany w plikach projektu.

## Scena

Scena to bardzo uproszczone boisko piłkarskie znajdujące się w bliżej nieokreślonym miejscu. Składa się z murawy, centralnej piłki (której położenie można zmieniać), czterech nieruchomych identycznych piłek, dwóch bramek, lamp stadionowych w każdym rogu boiska oraz olbrzymiego lustra wzdłuż bocznej linii.

## Funckjonalność i sterowanie

* Poruszanie centralnej piłki:
	* <b>W</b> - toczenie do przodu,
	* <b>S</b> - toczenie do tyłu,
	* <b>A</b> - toczenie w lewo,
	* <b>D</b> - toczenie w prawo,
	* <b>Q</b> - rotacja względem osi pionowej w lewo,
	* <b>E</b> - rotacja względem osi pionowej w prawo.

* Ustawienie kamery:
	* <b>1</b> - nieruchoma kamera obserwująca scenę (domyślna),
	* <b>2</b> - nieruchoma kamera śledząca ruch centralnej piłki,
	* <b>3</b> - ruchoma kamera obserwująca scenę z perspektywy centralnej piłki.

* Sposób cieniowania obiektów (cztery nieruchome piłki, bramki, lampy stadionowe):
	* <b>4</b> - cieniowanie płaskie (flat shading),
	* <b>5</b> - cieniowanie wg modelu Phonga (Phong shading, domyślne),
	* <b>6</b> - cieniowanie wg modelu Gourauda (Gouraud shading).

* Oświetlenie:
	* <b>7</b> - animacja zachodu/wschodu słońca, płynna zmiana noc-dzień,
	* <b>8</b> - włączenie/wyłączenie lamp stadionowych,
	* <b>9</b> - włączenie/wyłączenie reflektora związanego z centralną piłką.

* Modyfikacja reflektora centralnej piłki:
	* <b>Y</b> - oddalenie "celu" światła,
	* <b>H</b> - przybliżenie "celu" światła,
	* <b>G</b> - przesunięcie światła w lewo,
	* <b>J</b> - przesunięcie światła w prawo,
	* <b>B</b> - "rozszerzenie" światła reflektora,
	* <b>N</b> - "zwężenie" światła reflektora.

* Efekt mgły:
	* <i>slider</i> nad sceną pozwala określić intensywność mgły (zakres od 0,00001 do 0,01),
	* znajdujący się obok <i>checkbox</i> pozwala na zastosowanie lub wyłączenie efektu.

<br /><b>Autor:</b><br /> Adam Ryl, student PW MiNI G3.