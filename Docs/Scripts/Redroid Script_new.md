import gzip  
import os  
import shutil  
import re  
from stuffs.general import General  
from tools.helper import bcolors, download\_file, host, print\_color, run, get\_download\_dir

class Magisk(General):  
    download\_loc \= get\_download\_dir()  
    \# ✅ FIXED: Direct GitHub link (no self. prefix here)  
    dl\_link \= "https://github.com/topjohnwu/Magisk/releases/download/v27.0/Magisk-v27.0.apk"  
    dl\_file\_name \= os.path.join(download\_loc, "Magisk.apk")  
    extract\_to \= "/tmp/magisk\_unpack"  
    copy\_dir \= "./magisk"  
    magisk\_dir \= os.path.join(copy\_dir, "system", "etc", "init", "magisk")  
    machine \= host()

    oringinal\_bootanim \= """  
service bootanim /system/bin/bootanimation  
    class core animation  
    user graphics  
    group graphics  
    audio disabled  
    oneshot  
    ioprio rt 0  
    task\_profiles MaxPerformance  
"""

    bootanim\_component \= """  
on post-fs-data  
    start logd  
    exec u:r:su:s0 root root \-- /system/etc/init/magisk/magisk{arch} \--auto-selinux \--setup-sbin /system/etc/init/magisk  
    exec u:r:su:s0 root root \-- /system/etc/init/magisk/magiskpolicy \--live \--magisk "allow \* magisk\_file lnk\_file \*"  
    mkdir /sbin/.magisk 700  
    mkdir /sbin/.magisk/mirror 700  
    mkdir /sbin/.magisk/block 700  
    copy /system/etc/init/magisk/config /sbin/.magisk/config  
    rm /dev/.magisk\_unblock  
    exec u:r:su:s0 root root \-- /sbin/magisk \--auto-selinux \--post-fs-data  
    wait /dev/.magisk\_unblock 40  
    rm /dev/.magisk\_unblock

on zygote-start  
    exec u:r:su:s0 root root \-- /sbin/magisk \--auto-selinux \--service

on property:sys.boot\_completed=1  
    mkdir /data/adb/magisk 755  
    exec u:r:su:s0 root root \-- /sbin/magisk \--auto-selinux \--boot-complete  
    exec \-- /system/bin/sh \-c "if \[ \! \-e /data/data/io.github.huskydg.magisk \] ; then pm install /system/etc/init/magisk/magisk.apk ; fi"

on property:init.svc.zygote=restarting  
    exec u:r:su:s0 root root \-- /sbin/magisk \--auto-selinux \--zygote-restart

on property:init.svc.zygote=stopped  
    exec u:r:su:s0 root root \-- /sbin/magisk \--auto-selinux \--zygote-restart  
""".format(arch=machine\[1\])

    def download(self):  
        if os.path.isfile(self.dl\_file\_name):  
            os.remove(self.dl\_file\_name)  
        print\_color("Downloading latest Magisk v27.0 now .....", bcolors.GREEN)  
        download\_file(self.dl\_link, self.dl\_file\_name)

    def copy(self):  
        if os.path.exists(self.copy\_dir):  
            shutil.rmtree(self.copy\_dir)  
        if not os.path.exists(self.magisk\_dir):  
            os.makedirs(self.magisk\_dir, exist\_ok=True)

        if not os.path.exists(os.path.join(self.copy\_dir, "sbin")):  
            os.makedirs(os.path.join(self.copy\_dir, "sbin"), exist\_ok=True)

        print\_color("Copying magisk libs now ...", bcolors.GREEN)

        lib\_dir \= os.path.join(self.extract\_to, "lib", self.machine\[0\])  
        for parent, dirnames, filenames in os.walk(lib\_dir):  
            for filename in filenames:  
                o\_path \= os.path.join(lib\_dir, filename)  
                filename \= re.search('lib(.\*)\\.so', filename)  
                n\_path \= os.path.join(self.magisk\_dir, filename.group(1))  
                shutil.copyfile(o\_path, n\_path)  
                run(\["chmod", "+x", n\_path\])  
        shutil.copyfile(self.dl\_file\_name, os.path.join(self.magisk\_dir,"magisk.apk") )

        \# Updating Magisk from Magisk manager will modify bootanim.rc,  
        \# So it is necessary to backup the original bootanim.rc.  
        bootanim\_path \= os.path.join(self.copy\_dir, "system", "etc", "init", "bootanim.rc")  
        gz\_filename \= os.path.join(bootanim\_path)+".gz"  
        with gzip.open(gz\_filename,'wb') as f\_gz:  
            f\_gz.write(self.oringinal\_bootanim.encode('utf-8'))  
        with open(bootanim\_path, "w") as initfile:  
            initfile.write(self.oringinal\_bootanim+self.bootanim\_component)

        os.chmod(bootanim\_path, 0o644)  
