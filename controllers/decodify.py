# THIS IS EDITED VERSION OF AMAZING SCRIPT DECODIFY https://github.com/s0md3v/Decodify 
# -------
# -------


from urllib.parse import unquote
from re import search
from base64 import  b64decode
from bs4 import BeautifulSoup
import binascii
import argparse
import requests

text_type = str
binary_type = bytes
parser = argparse.ArgumentParser()
parser.add_argument('string', help="string to be decoded")
li = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']



args = parser.parse_args()
string = args.string


decoded = []
currentstring = 0
loop = 0
listofstrings = []

def ensure_str(s, encoding='latin-1', errors='strict'):

    if not isinstance(s, (text_type, binary_type,bytearray)):
        raise TypeError("not expecting type '%s'" % type(s))

    if isinstance(s, (binary_type,bytearray)):
        s = s.decode(encoding, errors)
    return s


def check_ascii(s):
    return all(ord(c) < 128 for c in s)

def Quit():
    global currentstring
    global decoded
    decoded = []
    if len(listofstrings) == currentstring:
        quit()
    else:
        print("String number: ", currentstring)
        currentstring += 1
        main(listofstrings[currentstring-1])
    #raise Exception("Couldnt find better way to quit a recursion")



# def SHA2(string, base):
#     html = urlopen("http://md5decrypt.net/Api/api.php?hash="+string+"&hash_type=sha256&email=deanna_abshire@proxymail.eu&code=1152464b80a61728")
#     string = html.read()
#     string = ensure_str(string)
#     if len(string) > 0:
#         if string in decoded:
#             Quit()
#         print('Cracked SHA2 Hash: %s |' % string)
#         decoded.append(string)
#         decode(base, 'sha2')
#         Quit()
#     else:
#         print('404 Its a SHA2 Hash but I failed to crack it.')
#         Quit()

# def SHA1(string, base):
#     data = urlencode({"auth":"8272hgt", "hash":string, "string":"","Submit":"Submit"})
#     html = urlopen("http://hashcrack.com/index.php" , data)
#     find = html.read()
#     match = search (r'<span class=hervorheb2>[^<]*</span></div></TD>', find)
#     if match:
#         string = match.group().split('hervorheb2>')[1][:-18]
#         string = ensure_str(string)
#         if string in decoded:
#             Quit()
#         print('Cracked SHA1 : %s |' % string)
#         decoded.append(string)
#         decode(base, 'sha1')
#         Quit()
#     else:
#         print('404 Its a SHA1 Hash but I failed to crack it.')
#         Quit()

def MD5(string, base):
    r = requests.get('https://md5.gromweb.com/?md5=' + string)
    soup = BeautifulSoup(r.text, 'html.parser')
    decoded_string = soup.find_all('em',class_='string')
    string = ensure_str(decoded_string[0].text)
    if len(string) > 0:
        if string in decoded:
            Quit()
        print('Cracked MD5 Hash : %s |' % string)
        decoded.append(string)
        # decode(base, 'md5')
        Quit()
    else:
        print('404 Its a MD5 Hash but I failed to crack it.')
        Quit()

def fromchar(string, base):
        string = string.lower()
        string = string.strip('string.fromcharcode(').strip(')').strip(' ')
        jv_list = string.split(',')
        decoded = []
        for i in jv_list:
            i = i.replace(' ', '').replace('97', 'a').replace('98', 'b').replace('99', 'c').replace('100', 'd').replace('101', 'e').replace('102', 'f').replace('103', 'g').replace('104', 'h').replace('105', 'i').replace('106', 'j').replace('107', 'k').replace('108', 'l').replace('109', 'm').replace('110', 'n').replace('111', 'o').replace('112', 'p').replace('113', 'q').replace('114', 'r').replace('115', 's').replace('116', 't').replace('117', 'u').replace('118', 'v').replace('119', 'w').replace('120', 'x').replace('121', 'y').replace('122', 'z').replace('48', '0').replace('49', '1').replace('50', '2').replace('51', '3').replace('52', '4').replace('53', '5').replace('54', '6').replace('55', '7').replace('56', '8').replace('57', '9').replace('33', '!').replace('64', '@').replace('35', '#').replace('36', '$').replace('37', '%').replace('94', '^').replace('38', '&').replace('42', '*').replace('40', '(').replace('41', ')').replace('45', '-').replace('61', '=').replace('95', '_').replace('43', '+').replace('91', '[').replace('93', ']').replace('92', '\\').replace('59', ';').replace('39', '\'').replace('44', ',').replace('46', '.').replace('47', '/').replace('123', '{').replace('125', '}').replace('124', '|').replace('58', ':').replace('34', '"').replace('60', '<').replace('62', '>').replace('63', '?').replace('32', ' ').replace(',', '').replace('65', 'A').replace('66', 'B').replace('67', 'C').replace('68', 'D').replace('69', 'E').replace('70', 'F').replace('71', 'G').replace('72', 'H').replace('73', 'I').replace('74', 'J').replace('75', 'K').replace('76', 'L').replace('77', 'M').replace('78', 'N').replace('79', 'O').replace('80', 'P').replace('81', 'Q').replace('82', 'R').replace('83', 'S').replace('84', 'T').replace('85', 'U').replace('86', 'V').replace('87', 'W').replace('88', 'X').replace('89', 'Y').replace('90', 'Z').replace('32', ' ')       
            decoded.append(i)
        string = ''.join(decoded)
        string = ensure_str(string)
        if string in decoded:
            Quit()
        print('Decoded from FromChar : %s |' % (string))
        decoded.append(string)
        decode(string, 'none')
        decode(base, 'jv_char')
        Quit()

def urle(string, base):
    string = unquote(string)
    string = ensure_str(string)
    if string in decoded:
        Quit()
    print('Decoded from URL encoding : %s |' % (string))
    decoded.append(string)
    decode(string, 'none')
    decode(base, 'url')
    Quit()

def hexenc(string, base):
    string = string.replace('0x', '')
    try:
    	string = bytearray.fromhex(string)
    except:
    	base64(base, 'none', 1)
    string = ensure_str(string)

    if string in decoded:
        Quit()
    print('Decoded from Hex : %s |' % (string))
    decoded.append(string)
    decode(string, 'none')
    decode(base, 'hexx')
    Quit()

def base64(string, base, cfh = '0'):
    try:
        string = b64decode(string)
        string = ensure_str(string)
    except:
        if cfh == 1:
            print("Failed to detect further Encoding!")
            Quit()
    if string in decoded:
        Quit()
    print('Base64 : %s |' % (string))
    decoded.append(string)
    decode(string, 'none')
    decode(base, 'b64')
    Quit()

def int_to_bytes(i):
    hex_string = '%x' % i
    n = len(hex_string)
    return binascii.unhexlify(hex_string.zfill(n + (n & 1)))

def bin_to_ascii(string, base):
    n = int(string, 2)
    string = int_to_bytes(n).decode()
    string = ensure_str(string)
    if string in decoded:
        Quit()
    print('Decoded from Binary : %s |' % (string))
    decoded.append(string)
    decode(string, 'none')
    decode(base, 'binary')
    Quit()

def decimal(string, base):
    calculated = []
    string = ensure_str(string)
    string = string.replace('&#', '').replace(';', ' ')
    str_list = string.split(' ')
    for i in str_list:
        if i == ' ':
            pass
        else:
            try:
                i = int(i)
                calculated.append(chr(i))
            except:
                pass
    string = ''.join(calculated).encode('utf-8')
    if string in decoded:
        Quit()
    print('Decoded from Decimal : %s |' % (string))
    decoded.append(string)
    
    decode(string, 'none')
    decode(base, 'deci')
    Quit()

def check_hex(string):
    string = string.replace(" ", "")
    hexx = search(r'^(0x|0X)?[a-fA-F0-9]+$', string)
    return hex


def decode(string, stop):
    string = ensure_str(string)
    global loop
    if check_ascii(string):
        base = string
        binary = search(r'^[01]+$', string)
        if binary and stop != 'binary':
            bin_to_ascii(string, base)
        md5 = search(r'^([a-f0-9]{32})$', string)
        if md5 and stop != 'md5':
            MD5(string, base)
        jv_char = search(r'\d*, \d*,', string)
        if jv_char and stop != 'jv_char':
            fromchar(string, base)
        url = search(r'(%..)+', string)
        if url and stop != 'url':
            urle(string, base)
        hexx = check_hex(string)
        if hexx and stop != 'hexx':
            hexenc(string, base)
        b64 = search(r'^[A-Za-z0-9+\/=]+$', string)
        if len(string) % 4 == 0 and b64 and stop != 'b64':
            base64(string, base)
        deci = search(r'&#.*;+', string)
        if deci and stop != 'deci':
            decimal(string, base)
        elif not decoded:
        	print ('Failed to detect the encoding.')
        	quit()
        loop += 1
        return 1

def main(string=args.string):
    global decoded
    decoded = []
    decode(string, 'none')

main()
