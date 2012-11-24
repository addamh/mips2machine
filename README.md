# MIPS2Machine
  This app was developed because I was tired of hand compiling Assembly to machine code, for CSCE2214 at the University of Arkansas, and leaving it to chance to mess up. It was built over a few days in about 4-5 hours so there's definitely room for improvement and cleanup. I still have to implement the Machinecode &rarr; MIPS tab functionality, but the MIPS &rarr; Machinecode should be fully functional for the ISA given for the CPU. The app is a pure Javascript app writen using the Proton framework. It also uses Coffeescript, HAML and SASS. Special thanks to js2coffee.org as I used their app as an template of functionality. 
## Diagram of CPU
![Alt text](https://raw.github.com/addamh/mips2machine/master/images/diagram.png)
## Instruction Set Architecture (ISA)
<table>
<tr><td style="background-color:#000; color: #FFF;">Instruction</td><td style="background-color:#000; color: #FFF;">Description</td><td style="background-color:#000; color: #FFF;">Opcode (15:12)</td><td style="background-color:#000; color: #FFF;">Rd
(11:8)</td><td style="background-color:#000; color: #FFF;">Rs (7:4)</td><td style="background-color:#000; color: #FFF;">Rt (3:0)</td></tr>
<tr><td>ADD Rd, Rs, Rt</td><td>Rd := Rs + Rt</td><td>0</td><td>0-15</td><td>0-15</td><td>0-15</td></tr>
<tr><td>ADDI Rd, Rs, Imm</td><td>Rd := Rs + SignExt(Imm)</td><td>4</td><td>0-15</td><td>0-15</td><td>Imm</td></tr>
<tr><td>SUB Rd, Rs, Rt</td><td>Rd := Rs - Rt</td><td>1</td><td>0-15</td><td>0-15</td><td>0-15</td></tr>
<tr><td>SUBI Rd, Rs, Imm</td><td>Rd := Rs - SignExt(Imm)</td><td>5</td><td>0-15</td><td>0-15</td><td>Imm</td></tr>
<tr><td>AND Rd, Rs, Rt</td><td>Rd := Rs and Rt</td><td>2</td><td>0-15</td><td>0-15</td><td>0-15</td></tr>
<tr><td>OR Rd, Rs, Rt</td><td>Rd := Rs or Rt</td><td>3</td><td>0-15</td><td>0-15</td><td>0-15</td></tr>
<tr><td>SLT Rd, Rs, Rt</td><td>if Rs < Rt then Rd := 1 else Rd := 0</td><td>7</td><td>0-15</td><td>0-15</td><td>0-15</td></tr>
<tr><td>LW Rd, off(Rs)</td><td>Rd := M[off + Rs]</td><td>8</td><td>0-15</td><td>0-15</td><td>offset</td></tr>
<tr><td>SW Rd, off(Rs)</td><td>M[off + Rs] := Rd</td><td>C</td><td>0-15</td><td>0-15</td><td>offset</td></tr>
<tr><td>BNE Rd, Rs, Imm</td><td>if Rd != Rs then pc := pc + 2 + addr 1</td><td>9</td><td>0-15</td><td>0-15</td><td>offset</td></tr>
<tr><td>JMP Address</td><td>pc := JumpAddress 2</td><td>B</td><td colspan=3>12-bit offset</td></tr>
</table>






