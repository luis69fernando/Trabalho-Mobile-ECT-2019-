/*
 * Copyright (C) 2015 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.android.tools.layoutlib.create;

import com.android.tools.layoutlib.create.ICreateInfo.InjectMethodRunnable;

import org.objectweb.asm.ClassVisitor;
import org.objectweb.asm.MethodVisitor;

import static org.objectweb.asm.Opcodes.ACC_PUBLIC;
import static org.objectweb.asm.Opcodes.ALOAD;
import static org.objectweb.asm.Opcodes.ARETURN;
import static org.objectweb.asm.Opcodes.INVOKEVIRTUAL;

public class InjectMethodRunnables {
    public static final ICreateInfo.InjectMethodRunnable CONTEXT_GET_FRAMEWORK_CLASS_LOADER
            = new InjectMethodRunnable() {
        @Override
        public void generateMethods(Object classVisitor) {
            assert classVisitor instanceof ClassVisitor;
            ClassVisitor cv = (ClassVisitor) classVisitor;
            // generated by compiling the class:
            // class foo { public ClassLoader getFrameworkClassLoader() { return getClass().getClassLoader(); } }
            // and then running ASMifier on it:
            // java -classpath asm-debug-all-5.0.2.jar:. org.objectweb.asm.util.ASMifier foo
            MethodVisitor mv = cv.visitMethod(ACC_PUBLIC, "getFrameworkClassLoader",
                    "()Ljava/lang/ClassLoader;", null, null);
            mv.visitCode();
            mv.visitVarInsn(ALOAD, 0);
            mv.visitMethodInsn(INVOKEVIRTUAL, "java/lang/Object", "getClass",
                    "()Ljava/lang/Class;");
            mv.visitMethodInsn(INVOKEVIRTUAL, "java/lang/Class", "getClassLoader",
                    "()Ljava/lang/ClassLoader;");
            mv.visitInsn(ARETURN);
            mv.visitMaxs(1, 1);
            mv.visitEnd();
            // generated code ends.
        }
    };
}
